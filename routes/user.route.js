const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");
const auth = require("../middleware/auth");

router.get("/info", auth, userController.getUserInfo);

module.exports = router;
