const User = require("../models/user.model");

const getUser = async ({ email, _id }) => {
  let user;
  if (email) user = await User.findOne({ email });
  if (_id) user = await User.findOne({ _id });
  if (!user) return null;
  user = user.toObject();
  delete user.password;
  return user;
};

module.exports = {
  getUser,
};
