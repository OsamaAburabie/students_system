const mongoose = require("mongoose");

const vaccineSchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },
    image: { type: String, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const Vaccine = mongoose.model("Vaccine", vaccineSchema);

module.exports = Vaccine;
