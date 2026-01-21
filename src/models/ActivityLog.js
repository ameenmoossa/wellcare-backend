const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    module: String,
    status: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "ActivityLog",
  activitySchema
);
