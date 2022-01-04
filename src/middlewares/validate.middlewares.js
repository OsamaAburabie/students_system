const { check, param, validationResult } = require("express-validator");
exports.validate = (method) => {
  switch (method) {
    case "register": {
      return [
        check("name").trim().not().isEmpty().withMessage("Name is required"),
        check("email")
          .trim()
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
          .trim()
          .isLength({ min: 8 })
          .withMessage("Password must be at least 8 characters long"),
        // check("uni_student_id")
        //   .trim()
        //   .not()
        //   .isEmpty()
        //   .withMessage("University Student ID is required"),
      ];
    }
    case "login": {
      return [
        check("email").trim().isEmail().withMessage("Email is required"),
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
