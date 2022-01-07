const User = require("../models/user.model");
const Vaccine = require("../models/vaccine.model");
const mongoose = require("mongoose");

const getStudent = async (req, res) => {
  isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid)
    return res.status(400).json({
      success: false,
      message: "Invalid ID",
    });
  let user = await User.findOne({ _id: req.params.id });
  if (!user)
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  // delete user.password;
  user = user.toObject();
  delete user.password;

  //======================= Get the vaccine ============================
  let vaccine = await Vaccine.findOne({ student_id: req.params.id });

  res.status(200).json({
    success: true,
    user,
    vaccine,
  });
};

module.exports = {
  getStudent,
};
