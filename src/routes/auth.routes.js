const express = require("express");
const {
  register,
  login,
  checkToken,
} = require("../controllers/auth.controllers");
const auth = require("../middlewares/auth.middlewares");
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

/*
@route POST /api/auth/check-token
@desc Check if the token is valid
@access Public
@header { x-auth-token: <token> }
*/
router.get("/check-token", auth, checkToken);

module.exports = router;
