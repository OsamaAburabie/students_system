const express = require("express");
const { changeRole } = require("../controllers/admin.controllers");
const auth = require("../middlewares/auth.middlewares");
const { role } = require("../middlewares/role.middlewares");
const {
  validate,
  validateResult,
} = require("../middlewares/validate.middlewares");
const router = express.Router();
/*
@route POST /api/admin/role
@desc Change role of a user
@access Private
@body { email, role }
@header { x-auth-token: <token> }
*/
router.post(
  "/role",
  auth,
  role("admin"),
  validate("roleChange"),
  validateResult,
  changeRole
);

module.exports = router;
