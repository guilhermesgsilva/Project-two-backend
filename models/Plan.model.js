const mongoose = require("mongoose");

const planSchema = mongoose.Schema(
  {
    planName: String,
    days: [
      {
        ids: Array,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Plan = mongoose.model("Plan", planSchema);

module.exports = Plan;
