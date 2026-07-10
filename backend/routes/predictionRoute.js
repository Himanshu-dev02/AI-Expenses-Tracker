// routes/predictionRoute.js
import express from "express";
import { getSpendingHistory } from "../controllers/predictionController.js";
import { protect } from "../middleware/auth.js";

const predictionRouter = express.Router();

// GET /api/prediction/spending
predictionRouter.get("/spending", protect, getSpendingHistory);

export default predictionRouter;
