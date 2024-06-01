const express = require("express");
const router = express.Router();
const checkUsernameController = require("../controllers/checkUsernameController");

router.post("/", checkUsernameController.checkUsername);

module.exports = router;
