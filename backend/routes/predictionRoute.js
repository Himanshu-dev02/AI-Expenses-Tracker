// routes/predictionRoute.js
import express from "express";
import {
  getSpendingHistory,
  getNextMonthPrediction,
} from "../controllers/predictionController.js";
import { protect } from "../middleware/auth.js";

const predictionRouter = express.Router();

// GET /api/prediction/spending   → 6-month history (for charts)
// GET /api/prediction/next-month → Gemini predictions with reasoning
predictionRouter.get("/spending", protect, getSpendingHistory);
predictionRouter.get("/next-month", protect, getNextMonthPrediction);

export default predictionRouter;