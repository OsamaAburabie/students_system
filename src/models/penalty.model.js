const mongoose = require("mongoose");

const penaltySchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    instructor_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    desc: { type: String, required: true },
  },
  { timestamps: true }
);

const Penalty = mongoose.model("Penalty", penaltySchema);

module.exports = Penalty;
