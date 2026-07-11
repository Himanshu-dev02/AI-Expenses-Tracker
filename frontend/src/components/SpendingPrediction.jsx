import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Lightbulb,
  Loader2,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import axios from "axios";

const BASE_URL = "http://localhost:4000";

// ── Helpers ────────────────────────────────────────────────────────────────
const fmt = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

const TrendBadge = ({ trend }) => {
  if (trend === "increasing")
    return (
      <span className="flex items-center gap-1 text-red-400 text-xs font-medium">
        <TrendingUp size={13} /> Increasing
      </span>
    );
  if (trend === "decreasing")
    return (
      <span className="flex items-center gap-1 text-teal-400 text-xs font-medium">
        <TrendingDown size={13} /> Decreasing
      </span>
    );
  return (
    <span className="flex items-center gap-1 text-gray-400 text-xs font-medium">
      <Minus size={13} /> Stable
    </span>
  );
};

const ConfidenceDot = ({ confidence }) => {
  const color =
    confidence === "high"
      ? "bg-teal-400"
      : confidence === "medium"
        ? "bg-yellow-400"
        : "bg-red-400";
  return (
    <span className="flex items-center gap-1 text-xs text-gray-400 capitalize">
      <span className={`w-2 h-2 rounded-full ${color}`} />
      {confidence} confidence
    </span>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────
const SpendingPrediction = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPrediction = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const { data: res } = await axios.get(
        `${BASE_URL}/api/prediction/next-month`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.success) {
        setError(res.message);
        return;
      }
      setData(res);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load predictions"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrediction();
  }, []);

  // ── Build chart data ─────────────────────────────────────────────────────
  // Shape Recharts needs: [{ category: "Food", actual: 1100, predicted: 1250 }, ...]
  const chartData = data
    ? data.predictions.map((p) => {
      // actual = last month's value for this category from history
      const catHistory = data.history.categories[p.category] || [];
      const actual = catHistory[catHistory.length - 1] || 0;
      return {
        category: p.category,
        actual: Math.round(actual),
        predicted: Math.round(p.predicted),
      };
    })
    : [];

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-6 p-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Spending Prediction
          </h2>
          {data && (
            <p className="text-sm text-gray-400 mt-0.5">
              Forecast for{" "}
              <span className="text-teal-400 font-medium">
                {data.nextMonth}
              </span>{" "}
              based on your last 6 months
            </p>
          )}
        </div>
        <button
          onClick={fetchPrediction}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-gray-300 disabled:opacity-50 transition"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
          <Loader2 size={32} className="animate-spin text-teal-400" />
          <p className="text-sm">Analysing your spending patterns...</p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
          <AlertCircle size={18} />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Content */}
      {!loading && data && (
        <>
          {/* ── Summary totals ── */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-white/5 border border-white/10 p-4">
              <p className="text-xs text-gray-400 mb-1">Last Month Actual</p>
              <p className="text-2xl font-bold text-white">
                {fmt(data.lastMonthTotal)}
              </p>
            </div>
            <div className="rounded-xl bg-teal-500/10 border border-teal-500/20 p-4">
              <p className="text-xs text-teal-400 mb-1">
                {data.nextMonth} Predicted
              </p>
              <p className="text-2xl font-bold text-teal-400">
                {fmt(data.predictedTotal)}
              </p>
              {/* delta vs last month */}
              {(() => {
                const delta = data.predictedTotal - data.lastMonthTotal;
                const pct = ((delta / data.lastMonthTotal) * 100).toFixed(1);
                return (
                  <p
                    className={`text-xs mt-1 ${delta > 0 ? "text-red-400" : "text-teal-400"
                      }`}
                  >
                    {delta > 0 ? "▲" : "▼"} {Math.abs(pct)}% vs last month
                  </p>
                );
              })()}
            </div>
          </div>

          {/* ── Bar chart ── */}
          <div className="rounded-xl bg-white/5 border border-white/10 p-4">
            <p className="text-sm font-medium text-gray-300 mb-4">
              Actual (last month) vs Predicted (next month)
            </p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={chartData}
                margin={{ top: 4, right: 8, left: 0, bottom: 4 }}
                barCategoryGap="30%"
                barGap={4}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.06)"
                  vertical={false}
                />
                <XAxis
                  dataKey="category"
                  tick={{ fill: "#9ca3af", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#9ca3af", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${v}`}
                  width={52}
                />
                <Tooltip
                  contentStyle={{
                    background: "#1f2937",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    color: "#f9fafb",
                    fontSize: 12,
                  }}
                  formatter={(value, name) => [
                    fmt(value),
                    name === "actual" ? "Last Month" : "Predicted",
                  ]}
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                />
                <Legend
                  formatter={(value) =>
                    value === "actual" ? "Last Month" : "Predicted"
                  }
                  wrapperStyle={{ fontSize: 12, color: "#9ca3af" }}
                />
                <Bar
                  dataKey="actual"
                  fill="#6b7280"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="predicted"
                  fill="#2dd4bf"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* ── Per-category insight cards ── */}
          <div>
            <p className="text-sm font-medium text-gray-300 mb-3">
              Category Breakdown
            </p>
            <div className="grid grid-cols-1 gap-3">
              {data.predictions.map((p) => {
                const catHistory =
                  data.history.categories[p.category] || [];
                const actual = catHistory[catHistory.length - 1] || 0;
                const delta = p.predicted - actual;
                const pct =
                  actual > 0
                    ? ((delta / actual) * 100).toFixed(1)
                    : null;

                return (
                  <div
                    key={p.category}
                    className="rounded-xl bg-white/5 border border-white/10 p-4"
                  >
                    {/* Top row */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {p.category}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <TrendBadge trend={p.trend} />
                          <ConfidenceDot confidence={p.confidence} />
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-lg font-bold text-teal-400">
                          {fmt(p.predicted)}
                        </p>
                        {pct !== null && (
                          <p
                            className={`text-xs ${delta > 0 ? "text-red-400" : "text-teal-400"
                              }`}
                          >
                            {delta > 0 ? "▲" : "▼"} {Math.abs(pct)}% vs
                            last month ({fmt(actual)})
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Reasoning */}
                    <p className="text-xs text-gray-400 mb-2 leading-relaxed">
                      {p.reasoning}
                    </p>

                    {/* Tip */}
                    <div className="flex items-start gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-3 py-2">
                      <Lightbulb
                        size={13}
                        className="text-yellow-400 shrink-0 mt-0.5"
                      />
                      <p className="text-xs text-yellow-300 leading-relaxed">
                        {p.tip}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SpendingPrediction;
