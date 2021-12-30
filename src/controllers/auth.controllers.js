const User = require("../models/user.model");
const { getUser } = require("../utils/getUser");
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

    //remove the role from the request body
    delete req.body.role;

    let user = new User(req.body);
    await user.save();

    //remove the password from the response
    user = user.toObject();
    delete user.password;

    return res.status(201).json({ user, token: generateToken(user._id) });
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
    let user = await User.findOne({ email: req.body.email });

    if (!user)
      return res.status(400).json({ message: "Invalid password or email" });

    const isMatch = await user.matchPassword(req.body.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid password or email" });

    //return the user info except the password
    user = user.toObject();
    delete user.password;

    return res.status(200).json({ user, token: generateToken(user._id) });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

module.exports = {
  register,
  login,
};
