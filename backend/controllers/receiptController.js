// controllers/receiptController.js
import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import expenseModel from "../models/expenseModel.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ---------------------------------------------------------------------------
// Helper – convert saved image to base64 Parts for Gemini
// ---------------------------------------------------------------------------
const imageToGenerativePart = (filePath, mimetype) => {
  const buffer = fs.readFileSync(filePath);
  return {
    inlineData: {
      data: buffer.toString("base64"),
      mimeType: mimetype === "image/heic" ? "image/jpeg" : mimetype,
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
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const imagePart = imageToGenerativePart(filePath, req.file.mimetype);

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

    // -----------------------------------------------------------------------
    // Gemini Vision call
    // -----------------------------------------------------------------------
    const result = await model.generateContent([prompt, imagePart]);
    const rawText = result.response.text().trim();

    // -----------------------------------------------------------------------
    // Parse response
    // -----------------------------------------------------------------------
    let extractedData;
    try {
      extractedData = JSON.parse(rawText);
    } catch {
      const cleaned = rawText.replace(/```json|```/g, "").trim();
      extractedData = JSON.parse(cleaned);
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
    fs.unlink(filePath, (err) => {
      if (err) console.error("Failed to delete temp receipt file:", err.message);
    });

    return res.status(200).json({
      success: true,
      extractedData,
      savedExpense: savedExpense || null,
      message: savedExpense
        ? "Receipt scanned and expense saved"
        : "Receipt scanned – review before saving",
    });
  } catch (error) {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    console.error("Receipt scan error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to scan receipt",
      error: error.message,
    });
  }
};