const express = require("express");
const { register, login } = require("../controllers/auth.controllers");
const {
  validate,
  validateResult,
} = require("../middlewares/validate.middlewares");
const router = express.Router();

router.post("/register", validate("register"), validateResult, register);
router.post("/login", validate("login"), validateResult, login);

module.exports = router;
