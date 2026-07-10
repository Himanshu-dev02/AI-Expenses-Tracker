// controllers/predictionController.js
import expenseModel from "../models/expenseModel.js";

// ---------------------------------------------------------------------------
// GET /api/prediction/spending
// Returns monthly spending totals per category for the last 6 months
// ---------------------------------------------------------------------------
export const getSpendingHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    // Start of the month, 6 months ago
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const result = await expenseModel.aggregate([

      // ── Stage 1: only this user's expenses in the last 6 months ──────────
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          date: { $gte: sixMonthsAgo },
          type: "expense",
        },
      },

      // ── Stage 2: group by month + category, sum the amounts ──────────────
      {
        $group: {
          _id: {
            year:     { $year:  "$date" },
            month:    { $month: "$date" },
            category: "$category",
          },
          total: { $sum: "$amount" },
          count: { $sum: 1 },          // how many transactions in that bucket
        },
      },

      // ── Stage 3: sort oldest → newest, then by category ──────────────────
      {
        $sort: {
          "_id.year":  1,
          "_id.month": 1,
          "_id.category": 1,
        },
      },

      // ── Stage 4: reshape into a cleaner output shape ──────────────────────
      {
        $project: {
          _id: 0,
          year:     "$_id.year",
          month:    "$_id.month",
          category: "$_id.category",
          total:    { $round: ["$total", 2] },
          count:    1,
          // human-readable label e.g. "Jan 2025"
          monthLabel: {
            $dateToString: {
              format: "%b %Y",
              date: {
                $dateFromParts: {
                  year:  "$_id.year",
                  month: "$_id.month",
                  day:   1,
                },
              },
            },
          },
        },
      },
    ]);

    // ── Restructure for the frontend ─────────────────────────────────────────
    // Transform flat array into:
    // {
    //   months: ["Jan 2025", "Feb 2025", ...],
    //   categories: {
    //     Food:      [120.50, 98.00, ...],
    //     Transport: [45.00, 60.00, ...],
    //   },
    //   raw: [...original aggregation result]
    // }

    // Collect all unique months in order
    const monthsSet = [...new Set(result.map((r) => r.monthLabel))];

    // Collect all unique categories
    const categoriesSet = [...new Set(result.map((r) => r.category))];

    // Build category → [total per month] map (0 if no spend that month)
    const categories = {};
    for (const cat of categoriesSet) {
      categories[cat] = monthsSet.map((month) => {
        const entry = result.find(
          (r) => r.monthLabel === month && r.category === cat
        );
        return entry ? entry.total : 0;
      });
    }

    return res.status(200).json({
      success: true,
      months: monthsSet,
      categories,
      raw: result,
    });
  } catch (error) {
    console.error("Spending history error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch spending history",
      error: error.message,
    });
  }
};
