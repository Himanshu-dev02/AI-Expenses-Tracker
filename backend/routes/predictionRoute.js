// routes/predictionRoute.js
import express from "express";
import {
  getSpendingHistory,
  getNextMonthPrediction,
} from "../controllers/predictionController.js";
import authMiddleware from "../middleware/auth.js";

const predictionRouter = express.Router();

// GET /api/prediction/spending   → 6-month history (for charts)
// GET /api/prediction/next-month → Gemini predictions with reasoning
predictionRouter.get("/spending", authMiddleware, getSpendingHistory);
predictionRouter.get("/next-month", authMiddleware, getNextMonthPrediction);

export default predictionRouter;