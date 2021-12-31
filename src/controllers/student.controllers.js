const Vaccine = require("../models/vaccine.model");

const uploadVaccine = async (req, res) => {
  const { image } = req.body;
  if (!image) return res.status(400).json({ message: "Please provide image" });
  const vaccineExsists = await Vaccine.findOne({ student_id: req.userId });
  if (vaccineExsists) {
    return res.status(400).json({ message: "Vaccine already uploaded" });
  }
  const vaccine = new Vaccine({
    student_id: req.userId,
    image,
  });
  await vaccine.save();
  res.status(200).json({ message: "Vaccine uploaded successfully", vaccine });
};

module.exports = {
  uploadVaccine,
};
