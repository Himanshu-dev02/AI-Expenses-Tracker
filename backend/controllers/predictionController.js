// controllers/predictionController.js
import mongoose from "mongoose";
import { GoogleGenerativeAI } from "@google/generative-ai";
import expenseModel from "../models/expenseModel.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ---------------------------------------------------------------------------
// Shared helper — runs the 6-month aggregation
// Used by both endpoints below so the query isn't duplicated
// ---------------------------------------------------------------------------
const fetchSixMonthHistory = async (userId) => {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  sixMonthsAgo.setDate(1);
  sixMonthsAgo.setHours(0, 0, 0, 0);

  const result = await expenseModel.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        date: { $gte: sixMonthsAgo },
        type: "expense",
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          category: "$category",
        },
        total: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
        "_id.category": 1,
      },
    },
    {
      $project: {
        _id: 0,
        year: "$_id.year",
        month: "$_id.month",
        category: "$_id.category",
        total: { $round: ["$total", 2] },
        count: 1,
        monthLabel: {
          $dateToString: {
            format: "%b %Y",
            date: {
              $dateFromParts: {
                year: "$_id.year",
                month: "$_id.month",
                day: 1,
              },
            },
          },
        },
      },
    },
  ]);

  // Reshape flat array → { months, categories, raw }
  const monthsSet = [...new Set(result.map((r) => r.monthLabel))];
  const categoriesSet = [...new Set(result.map((r) => r.category))];

  const categories = {};
  for (const cat of categoriesSet) {
    categories[cat] = monthsSet.map((month) => {
      const entry = result.find(
        (r) => r.monthLabel === month && r.category === cat
      );
      return entry ? entry.total : 0;
    });
  }

  return { months: monthsSet, categories, raw: result };
};

// ---------------------------------------------------------------------------
// GET /api/prediction/spending
// Returns raw 6-month history (used by the chart)
// ---------------------------------------------------------------------------
export const getSpendingHistory = async (req, res) => {
  try {
    const data = await fetchSixMonthHistory(req.user.id);
    return res.status(200).json({ success: true, ...data });
  } catch (error) {
    console.error("Spending history error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch spending history",
      error: error.message,
    });
  }
};

// ---------------------------------------------------------------------------
// GET /api/prediction/next-month
// Sends 6-month history to Gemini → returns per-category predictions
// with reasoning, trend, and a budget tip for each
// ---------------------------------------------------------------------------
export const getNextMonthPrediction = async (req, res) => {
  try {
    const { months, categories, raw } = await fetchSixMonthHistory(req.user.id);

    if (raw.length === 0) {
      return res.status(200).json({
        success: false,
        message: "Not enough expense data to make predictions. Add at least one month of expenses first.",
      });
    }

    // ── Build a clear, compact summary to send to Gemini ─────────────────────
    // Format: plain text table so the model can reason over it easily
    const historyLines = [];
    for (const [category, totals] of Object.entries(categories)) {
      const pairs = months.map((m, i) => `${m}: $${totals[i]}`).join(" | ");
      historyLines.push(`${category}: ${pairs}`);
    }
    const historyText = historyLines.join("\n");

    // Next month label for the prompt
    const nextMonthDate = new Date();
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    const nextMonthLabel = nextMonthDate.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });

    // ── Gemini prompt ─────────────────────────────────────────────────────────
    const prompt = `You are a personal finance AI. Analyse this user's last 6 months of spending and predict next month's expenses.

SPENDING HISTORY (monthly totals per category):
${historyText}

TASK: Predict spending for ${nextMonthLabel} for each category above.

Return ONLY a valid JSON array — no markdown, no explanation, just raw JSON.

Each item in the array must follow this exact shape:
[
  {
    "category": "Food",
    "predicted": 1250.00,
    "trend": "increasing",
    "confidence": "high",
    "reasoning": "Spending has risen steadily over 3 months, up 12% month-on-month",
    "tip": "Consider meal prepping on weekends to cut the Food bill by ~15%"
  }
]

Rules:
- "trend" must be one of: "increasing" | "decreasing" | "stable"
- "confidence" must be one of: "high" | "medium" | "low"
- "predicted" is a number (no currency symbol)
- "reasoning" is 1 concise sentence explaining the prediction
- "tip" is 1 actionable saving suggestion specific to that category
- Include every category from the history — do not skip any
- If a category has only 1 month of data, set confidence to "low"`;

    // ── Call Gemini ───────────────────────────────────────────────────────────
    const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });
    const result = await model.generateContent(prompt);
    const rawText = result.response.text().trim();

    // ── Parse response ────────────────────────────────────────────────────────
    let predictions;
    try {
      predictions = JSON.parse(rawText);
    } catch {
      const cleaned = rawText.replace(/```json|```/g, "").trim();
      predictions = JSON.parse(cleaned);
    }

    // ── Calculate totals ──────────────────────────────────────────────────────
    const predictedTotal = predictions.reduce(
      (sum, p) => sum + (p.predicted || 0),
      0
    );

    // Last month's actual total for comparison
    const lastMonth = months[months.length - 1];
    const lastMonthTotal = Object.values(categories).reduce((sum, totals) => {
      return sum + (totals[totals.length - 1] || 0);
    }, 0);

    return res.status(200).json({
      success: true,
      nextMonth: nextMonthLabel,
      predictions,                              // per-category array
      predictedTotal: Math.round(predictedTotal * 100) / 100,
      lastMonthTotal: Math.round(lastMonthTotal * 100) / 100,
      history: { months, categories },          // included so frontend can chart both
    });
  } catch (error) {
    console.error("Prediction error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to generate prediction",
      error: error.message,                         
    });
  }
};