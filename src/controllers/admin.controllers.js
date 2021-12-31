const User = require("../models/user.model");

const changeRole = async (req, res) => {
  const { email, role } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { role },
      { new: true }
    );
    if (!user) return res.status(400).json({ message: "User does not exist" });
    return res
      .status(200)
      .json({ message: "Role changed successfully", role: user.role });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

module.exports = {
  changeRole,
};
