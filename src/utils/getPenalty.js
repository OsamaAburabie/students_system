const Penalty = require("../models/penalty.model");

const getPenalty = async ({ student_id, instructor_id }) => {
  let penalty;
  if (student_id) penalty = await Penalty.find({ student_id });
  if (instructor_id) penalty = await User.find({ instructor_id });
  if (!penalty) return null;
  return penalty;
};

module.exports = {
  getPenalty,
};
