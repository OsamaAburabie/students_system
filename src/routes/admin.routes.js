const express = require("express");
const { changeRole } = require("../controllers/admin.controllers");
const auth = require("../middlewares/auth.middlewares");
const { role } = require("../middlewares/rolde.middlewares");
const router = express.Router();

router.post("/role", auth, role("admin"), changeRole);

module.exports = router;
