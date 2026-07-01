// routes/receiptRoute.js
import express from "express";
import { scanReceipt } from "../controllers/receiptController.js";
import upload from "../middleware/receiptUpload.js";
import authMiddleware from "../middleware/auth.js";

const receiptRouter = express.Router();

// POST /api/receipt/scan
// Field name must be "receipt" to match multer's single() config
receiptRouter.post("/scan", authMiddleware, upload.single("receipt"), scanReceipt);

export default receiptRouter;