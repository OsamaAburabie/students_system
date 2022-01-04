const express = require("express");
const { getStudent } = require("../controllers/guard.controllers");
const { uploadVaccine } = require("../controllers/student.controllers");
const auth = require("../middlewares/auth.middlewares");
const { role } = require("../middlewares/role.middlewares");
const router = express.Router();
/*
@route POST /api/guard/scan
@desc Get the student's information
@access Private
@params { id }
@header { x-auth-token: <token> }
*/
router.post("/vaccine", auth, role("student"), uploadVaccine);

module.exports = router;
