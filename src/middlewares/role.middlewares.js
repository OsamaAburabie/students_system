const { getUser } = require("../utils/getUser");
const User = require("../models/user.model");

const role = (role) => {
  return async (req, res, next) => {
    try {
      const user = await User.findOne({ _id: req.userId });
      if (!user) return res.status(401).json({ message: "Unauthorized" });
      if (user.role !== role) {
        return res.status(403).json({ message: "Forbidden" });
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  };
};

module.exports = {
  role,
};
