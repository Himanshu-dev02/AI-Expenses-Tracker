// controllers/receiptController.js
import fs from "fs";
import sharp from "sharp";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createWorker } from "tesseract.js";
import expenseModel from "../models/expenseModel.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash";

const cleanupTempFile = async (filePath) => {
  if (!filePath || !fs.existsSync(filePath)) return;

  try {
    await fs.promises.unlink(filePath);
  } catch (err) {
    console.error("Failed to delete temp receipt file:", err.message);
  }
};

const parseCurrencyValue = (value) => {
  const cleaned = value.replace(/[^\d.,-]/g, "").replace(/,/g, "");
  const parsed = Number.parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
};

const extractAmountFromText = (text) => {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const priorityLine = lines.find((line) =>
    /(total|amount due|balance|grand total|paid|subtotal)/i.test(line)
  );

  if (priorityLine) {
    const amountMatch = priorityLine.match(/(?:\$|usd\s*)?([0-9][0-9,]*\.?[0-9]{0,2})/i);
    if (amountMatch) {
      const value = parseCurrencyValue(amountMatch[1]);
      if (value !== null) return value;
    }
  }

  const allAmounts = [...text.matchAll(/(?:\$|usd\s*)?([0-9][0-9,]*\.?[0-9]{0,2})/gi)]
    .map((match) => parseCurrencyValue(match[1]))
    .filter((value) => value !== null);

  if (allAmounts.length === 0) return null;
  return Math.max(...allAmounts);
};

const extractDateFromText = (text) => {
  const isoMatch = text.match(/\b(20\d{2})[\/-](\d{1,2})[\/-](\d{1,2})\b/);
  if (isoMatch) {
    const year = Number(isoMatch[1]);
    const month = Number(isoMatch[2]);
    const day = Number(isoMatch[3]);
    return new Date(Date.UTC(year, month - 1, day)).toISOString();
  }

  const slashMatch = text.match(/\b(\d{1,2})[\/-](\d{1,2})[\/-](\d{2,4})\b/);
  if (!slashMatch) return null;

  let partA = Number(slashMatch[1]);
  let partB = Number(slashMatch[2]);
  let year = Number(slashMatch[3]);

  if (year < 100) year += 2000;

  let month = partA;
  let day = partB;

  if (partA > 12 && partB <= 12) {
    month = partB;
    day = partA;
  }

  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  return new Date(Date.UTC(year, month - 1, day)).toISOString();
};

const inferCategory = (text) => {
  const normalized = text.toLowerCase();

  if (/(grocery|supermarket|restaurant|cafe|coffee|food|meal|pizza|burger|mcdonald|kfc|subway|starbucks)/i.test(normalized)) {
    return "Food";
  }
  if (/(rent|mortgage|apartment|lease|electric|water|gas|internet|utility)/i.test(normalized)) {
    return "Housing";
  }
  if (/(uber|lyft|taxi|bus|train|metro|fuel|gas station|parking)/i.test(normalized)) {
    return "Transport";
  }
  if (/(shop|store|mall|amazon|walmart|target|costco|ikea|purchase)/i.test(normalized)) {
    return "Shopping";
  }
  if (/(cinema|movie|netflix|spotify|game|concert|theater|entertainment)/i.test(normalized)) {
    return "Entertainment";
  }
  if (/(pharmacy|hospital|clinic|doctor|medical|health|medicine)/i.test(normalized)) {
    return "Healthcare";
  }

  return "Other";
};

const extractMerchantFromText = (text) => {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) return null;

  const skipPatterns = /^(receipt|invoice|tax|subtotal|total|amount|date|time|cash|card|change|balance|thank you)/i;
  const merchantLine = lines.find((line) => !skipPatterns.test(line));
  return merchantLine || lines[0] || null;
};

const buildFallbackExtraction = (text) => {
  const merchant = extractMerchantFromText(text);
  const amount = extractAmountFromText(text);
  const date = extractDateFromText(text) || new Date().toISOString();

  return {
    amount,
    date,
    category: inferCategory(text),
    merchant,
    description: merchant || "Receipt scan",
    confidence: "low",
  };
};

const extractWithGemini = async (imagePart) => {
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

  const prompt = `Analyze this receipt image and extract the expense information.
Return ONLY a valid JSON object with no markdown, no explanation, just the raw JSON.

Required fields:
{
  "amount": <number, total amount paid>,
  "date": "<ISO 8601 date string, e.g. 2024-01-15>",
  "category": "<one of: Food, Housing, Transport, Shopping, Entertainment, Utilities, Healthcare, Other>",
  "merchant": "<store or restaurant name>",
  "description": "<brief description of the purchase>",
  "confidence": "<high | medium | low based on image clarity>"
}

If a field cannot be determined from the receipt, use null for that field.
Do not include currency symbols in the amount field, only the numeric value.`;

  const result = await model.generateContent([prompt, imagePart]);
  const rawText = result.response.text().trim();

  try {
    return JSON.parse(rawText);
  } catch {
    const cleaned = rawText.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  }
};

const extractWithLocalOcr = async (filePath) => {
  const worker = await createWorker("eng");

  try {
    const { data } = await worker.recognize(filePath);
    const text = data?.text?.trim() || "";
    return buildFallbackExtraction(text);
  } finally {
    await worker.terminate();
  }
};

// ---------------------------------------------------------------------------
// Helper – resize/compress image and convert to base64 Part for Gemini
// ---------------------------------------------------------------------------
const imageToGenerativePart = async (filePath) => {
  const buffer = await sharp(filePath)
    .rotate() // auto-orient based on EXIF data
    .resize({ width: 1500, withoutEnlargement: true })
    .jpeg({ quality: 80 })
    .toBuffer();

  return {
    inlineData: {
      data: buffer.toString("base64"),
      mimeType: "image/jpeg",
    },
  };
};

// ---------------------------------------------------------------------------
// POST /api/receipt/scan
// ---------------------------------------------------------------------------
export const scanReceipt = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No receipt image uploaded" });
  }

  const filePath = req.file.path;

  try {
    // -----------------------------------------------------------------------
    // Gemini Vision call / Local OCR fallback
    // -----------------------------------------------------------------------
    let extractedData;
    try {
      const imagePart = await imageToGenerativePart(filePath);
      extractedData = await extractWithGemini(imagePart);
    } catch (geminiError) {
      console.warn("Gemini scan failed, falling back to local OCR:", geminiError.message);
      try {
        extractedData = await extractWithLocalOcr(filePath);
      } catch (ocrError) {
        console.error("Local OCR fallback also failed:", ocrError.message);
        throw geminiError;
      }
    }

    // -----------------------------------------------------------------------
    // Optional auto-save: pass ?save=true in the query string
    // Matches your schema's field names: description, amount, category, date, userId, type
    // -----------------------------------------------------------------------
    let savedExpense = null;
    if (req.query.save === "true" && extractedData.amount && extractedData.date) {
      const expense = new expenseModel({
        userId: req.user.id,
        amount: extractedData.amount,
        date: new Date(extractedData.date),
        category: extractedData.category || "Other",
        description: extractedData.description || extractedData.merchant || "Receipt scan",
        type: "expense",
        receiptImage: req.file.filename,
      });
      savedExpense = await expense.save();
    }

    // -----------------------------------------------------------------------
    // Clean up uploaded file after processing
    // -----------------------------------------------------------------------
    await cleanupTempFile(filePath);

    return res.status(200).json({
      success: true,
      extractedData,
      savedExpense: savedExpense || null,
      message: savedExpense
        ? "Receipt scanned and expense saved"
        : "Receipt scanned – review before saving",
    });
  } catch (error) {
    await cleanupTempFile(filePath);
    console.error("Receipt scan error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to scan receipt",
      error: error.message,
    });
  }
};