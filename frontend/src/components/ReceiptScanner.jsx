import React, { useState, useRef } from "react";
import { Camera, Upload, X, Loader2, Check, RotateCcw } from "lucide-react";
import { modalStyles } from "../assets/dummyStyles";
import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api";

const ReceiptScanner = ({ showScanner, setShowScanner, onConfirm, color = "teal" }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");
  const [extracted, setExtracted] = useState(null);

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  if (!showScanner) return null;

  const colorClass = modalStyles.colorClasses[color];

  // ---------------------------------------------------------------------------
  // Reset everything back to the "pick an image" state
  // ---------------------------------------------------------------------------
  const resetScanner = () => {
    setImageFile(null);
    setImagePreview(null);
    setExtracted(null);
    setError("");
    setScanning(false);
  };

  const handleClose = () => {
    resetScanner();
    setShowScanner(false);
  };

  // ---------------------------------------------------------------------------
  // File selection (works for both camera capture and gallery upload —
  // the only difference is the `capture` attribute on the hidden input)
  // ---------------------------------------------------------------------------
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    setError("");
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setExtracted(null);
  };

  // ---------------------------------------------------------------------------
  // Send the image to the backend for Gemini extraction
  // ---------------------------------------------------------------------------
  const handleScan = async () => {
    if (!imageFile) return;

    setScanning(true);
    setError("");

    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const formData = new FormData();
      formData.append("receipt", imageFile);

      const { data } = await axios.post(`${API_BASE_URL}/receipt/scan`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setExtracted({
        description: data.extractedData.description || data.extractedData.merchant || "",
        amount: data.extractedData.amount ?? "",
        category: data.extractedData.category || "Other",
        date: data.extractedData.date
          ? data.extractedData.date.split("T")[0]
          : new Date().toISOString().split("T")[0],
        confidence: data.extractedData.confidence || "medium",
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Couldn't read that receipt — try a clearer photo"
      );
    } finally {
      setScanning(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Field edits on the extracted preview
  // ---------------------------------------------------------------------------
  const updateField = (field, value) => {
    setExtracted((prev) => ({ ...prev, [field]: value }));
  };

  // ---------------------------------------------------------------------------
  // Pass the (possibly edited) data up to the parent — parent decides whether
  // to open Add.jsx pre-filled or save directly
  // ---------------------------------------------------------------------------
  const handleConfirm = () => {
    onConfirm({
      description: extracted.description,
      amount: extracted.amount,
      category: extracted.category,
      date: extracted.date,
      type: "expense",
    });
    resetScanner();
    setShowScanner(false);
  };

  const categories = [
    "Food",
    "Housing",
    "Transport",
    "Shopping",
    "Entertainment",
    "Utilities",
    "Healthcare",
    "Other",
  ];

  return (
    <div className={modalStyles.overlay}>
      <div className={modalStyles.modalContainer}>
        <div className={modalStyles.modalHeader}>
          <h3 className={modalStyles.modalTitle}>Scan Receipt</h3>
          <button onClick={handleClose} className={modalStyles.closeButton}>
            <X size={24} />
          </button>
        </div>

        <div className={modalStyles.form}>
          {/* ---------------------------------------------------------------- */}
          {/* STEP 1 — no image yet: show camera + upload buttons              */}
          {/* ---------------------------------------------------------------- */}
          {!imagePreview && (
            <div className="flex flex-col gap-3">
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileSelect}
                className="hidden"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className={modalStyles.submitButton(colorClass.button)}
              >
                <span className="flex items-center justify-center gap-2">
                  <Camera size={20} />
                  Take Photo
                </span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={modalStyles.input(colorClass.ring) + " cursor-pointer text-center"}
              >
                <span className="flex items-center justify-center gap-2">
                  <Upload size={18} />
                  Upload from Gallery
                </span>
              </button>

              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* STEP 2 — image selected, not scanned yet: show preview + scan    */}
          {/* ---------------------------------------------------------------- */}
          {imagePreview && !extracted && (
            <div className="flex flex-col gap-3">
              <div className="relative rounded-lg overflow-hidden border border-gray-700">
                <img src={imagePreview} alt="Receipt preview" className="w-full max-h-72 object-contain bg-black/20" />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={resetScanner}
                  disabled={scanning}
                  className={modalStyles.input(colorClass.ring) + " flex-1 cursor-pointer text-center disabled:opacity-50"}
                >
                  <span className="flex items-center justify-center gap-2">
                    <RotateCcw size={16} />
                    Retake
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleScan}
                  disabled={scanning}
                  className={modalStyles.submitButton(colorClass.button) + " flex-1 disabled:opacity-70"}
                >
                  <span className="flex items-center justify-center gap-2">
                    {scanning ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Reading...
                      </>
                    ) : (
                      "Scan Receipt"
                    )}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* STEP 3 — extracted: editable preview fields                      */}
          {/* ---------------------------------------------------------------- */}
          {extracted && (
            <div className="flex flex-col gap-4">
              {extracted.confidence === "low" && (
                <p className="text-amber-500 text-sm">
                  ⚠ The image was a little unclear — double-check these values
                </p>
              )}

              <div>
                <label className={modalStyles.label}>Description</label>
                <input
                  type="text"
                  value={extracted.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  className={modalStyles.input(colorClass.ring)}
                />
              </div>

              <div>
                <label className={modalStyles.label}>Amount</label>
                <input
                  type="number"
                  value={extracted.amount}
                  onChange={(e) => updateField("amount", e.target.value)}
                  className={modalStyles.input(colorClass.ring)}
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className={modalStyles.label}>Category</label>
                <select
                  value={extracted.category}
                  onChange={(e) => updateField("category", e.target.value)}
                  className={modalStyles.input(colorClass.ring)}
                >
                  {categories.map((cat) => (
                    <option value={cat} key={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={modalStyles.label}>Date</label>
                <input
                  type="date"
                  value={extracted.date}
                  onChange={(e) => updateField("date", e.target.value)}
                  className={modalStyles.input(colorClass.ring)}
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={resetScanner}
                  className={modalStyles.input(colorClass.ring) + " flex-1 cursor-pointer text-center"}
                >
                  Scan Another
                </button>

                <button
                  type="button"
                  onClick={handleConfirm}
                  className={modalStyles.submitButton(colorClass.button) + " flex-1"}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Check size={18} />
                    Confirm
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReceiptScanner;
