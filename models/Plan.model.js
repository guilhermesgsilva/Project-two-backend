const mongoose = require("mongoose");

const planSchema = mongoose.Schema(
  {
    planName: String,
    days: [
      {
        ids: Array,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true,
  }
);

const Plan = mongoose.model("Plan", planSchema);

module.exports = Plan;
