const Vaccine = require("../models/vaccine.model");
const User = require("../models/user.model");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");

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

const uploadAvatar = async (req, res) => {
  // const avatar = req?.file?.path;
  // if (!avatar)
  //   return res
  //     .status(400)
  //     .json({ success: false, message: "Please provide image" });
  // try {
  //   const result = await cloudinary.uploader.upload(avatar);
  //   let user = await User.findOneAndUpdate(
  //     { _id: req.userId },
  //     { avatar: result.url },
  //     { new: true }
  //   );

  //   user = user.toObject();
  //   delete user.password;

  //   res.status(200).json({ success: true, user });
  // } catch (error) {
  //   console.log(error);

  //   res.status(500).json({
  //     success: false,
  //     message: req.file_error,
  //   });
  // }

  try {
    const avatar = req?.files?.image?.tempFilePath;
    if (!avatar)
      return res.status(400).json({ message: "Please provide image" });
    const result = await cloudinary.uploader.upload(avatar);
    let user = await User.findOneAndUpdate(
      { _id: req.userId },
      { avatar: result.url },
      { new: true }
    );

    fs.unlinkSync(avatar);

    user = user.toObject();
    delete user.password;

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  uploadVaccine,
  uploadAvatar,
};
