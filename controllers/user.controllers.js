const User = require("../models/user.model");
require("dotenv").config();

exports.getUserInfo = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const userId = req.user._id;
    const user = await User.findById(userId).select(
      "nickname pet city district"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
