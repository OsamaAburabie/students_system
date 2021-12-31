const { check, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "register": {
      return [
        check("name").not().isEmpty().withMessage("Name is required"),
        check("email")
          .not()
          .isEmpty()
          .withMessage("Email is required")
          .isEmail()
          .withMessage("Unvalid email")
          .custom((value) => {
            if (!value.endsWith("@gmail.com")) {
              throw new Error("Email must end with @gmail.com");
            }
            return true;
          }),
        check("password")
          .isLength({ min: 8 })
          .withMessage("Password must be at least 8 characters long"),
        check("uni_student_id")
          .not()
          .isEmpty()
          .withMessage("University Student ID is required"),
      ];
    }
    case "login": {
      return [
        check("email").isEmail().withMessage("Email is required"),
        check("password").not().isEmpty().withMessage("Password is required"),
      ];
    }
    case "roleChange": {
      return [
        check("email").isEmail().withMessage("Email is required"),
        check("role").not().isEmpty().withMessage("Role is required"),
      ];
    }
    default: {
      return [];
    }
  }
};

exports.validateResult = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) {
    return next();
  }

  const error = result[0].msg;
  return res.status(422).json({ message: error });
};
