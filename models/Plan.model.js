const mongoose = require("mongoose");

const planSchema = mongoose.Schema(
    {
        name: String,
    },
    {
        timestamps: true,
    }
);

const Plan = mongoose.model("Plan", planSchema);

module.exports = Plan;