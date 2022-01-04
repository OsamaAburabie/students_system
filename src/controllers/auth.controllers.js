const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");

const register = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists)
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });

    //remove the role from the request body
    delete req.body.role;

    let user = new User(req.body);
    await user.save();

    //remove the password from the response
    user = user.toObject();
    delete user.password;

    return res.status(201).json({
      success: true,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

const login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user)
      return res.status(400).json({
        success: false,
        message: "Invalid password or email",
      });

    const isMatch = await user.matchPassword(req.body.password);
    if (!isMatch)
      return res.status(400).json({
        success: false,
        message: "Invalid password or email",
      });

    //return the user info except the password
    user = user.toObject();
    delete user.password;

    return res.status(200).json({
      success: true,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

const checkToken = async (req, res) => {
  try {
    let user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }

    user = user.toObject();
    delete user.password;

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

module.exports = {
  register,
  login,
  checkToken,
};
