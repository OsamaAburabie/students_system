const express = require("express");
const { register, login } = require("../controllers/auth.controllers");
const {
  validate,
  validateResult,
} = require("../middlewares/validate.middlewares");
const router = express.Router();
/*
@route POST /api/auth/register
@desc Register a user
@access Public
@body { name, email, password, uni_student_id, dob, avatar }
*/
router.post("/register", validate("register"), validateResult, register);

/*
@route POST /api/auth/login
@desc Login a user
@access Public
@body { email, password }
*/
router.post("/login", validate("login"), validateResult, login);

module.exports = router;
