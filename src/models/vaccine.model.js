const mongoose = require("mongoose");

const vaccineSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    vaccineImage: { type: String, required: true },
  },
  { timestamps: true }
);

const Vaccine = mongoose.model("Vaccine", vaccineSchema);

module.exports = Vaccine;
