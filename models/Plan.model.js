const mongoose = require("mongoose");

const planSchema = mongoose.Schema(
  {
    planName: String,
    days: [
      {
        name: String,
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
