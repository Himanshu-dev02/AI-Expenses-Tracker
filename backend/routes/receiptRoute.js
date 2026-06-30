// routes/receiptRoute.js
const express = require("express");
const router = express.Router();
const { scanReceipt } = require("../controllers/receiptController");
const upload = require("../middleware/receiptUpload");
const { protect } = require("../middleware/auth"); // your existing JWT middleware

// POST /api/receipt/scan
// Field name must be "receipt" to match multer's single() config
router.post("/scan", protect, upload.single("receipt"), scanReceipt);

module.exports = router;
