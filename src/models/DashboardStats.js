const mongoose = require("mongoose");

const dashboardStatsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  streak: { type: Number, default: 1 },
  activeDays: { type: Number, default: 1 },
  modulesDone: { type: [String], default: [] },
  lastActive: { type: String }, // Date string
}, { timestamps: true });

module.exports = mongoose.model("DashboardStats", dashboardStatsSchema);
