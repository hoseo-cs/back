const express = require("express");
const router = express.Router();
const signupController = require("../controllers/signpup.controllers");

router.post("/", signupController.signup);

module.exports = router;
