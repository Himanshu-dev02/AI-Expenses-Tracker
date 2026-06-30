// routes/receiptRoute.js
import express from "express";
import { scanReceipt } from "../controllers/receiptController.js";
import upload from "../middleware/receiptUpload.js";
import { protect } from "../middleware/auth.js"; // adjust name if your JWT middleware export differs

const receiptRouter = express.Router();

// POST /api/receipt/scan
// Field name must be "receipt" to match multer's single() config
receiptRouter.post("/scan", protect, upload.single("receipt"), scanReceipt);

export default receiptRouter;