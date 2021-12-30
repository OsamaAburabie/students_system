const changeRole = (req, res) => {
  console.log(req.user);
  return res.status(200).json({ message: "change role" });
};

module.exports = {
  changeRole,
};
