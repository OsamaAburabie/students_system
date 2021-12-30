const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");

/*
@route POST /api/auth/register
@desc Register a user
@access Public
@body { name, email, password, uni_student_id, dob, avatar }
*/
const register = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = new User(req.body);
    await user.save();

    //return the user info except the password
    const userInfo = user.toObject();
    delete userInfo.password;

    return res
      .status(201)
      .json({ user: userInfo, token: generateToken(userInfo._id) });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

/*
@route POST /api/auth/login
@desc Login a user
@access Public
@body { email, password }
*/
const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({ message: "Invalid password or email" });

    const isMatch = await user.matchPassword(req.body.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid password or email" });

    //return the user info except the password
    const userInfo = user.toObject();
    delete userInfo.password;

    return res
      .status(200)
      .json({ user: userInfo, token: generateToken(userInfo._id) });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

module.exports = {
  register,
  login,
};
