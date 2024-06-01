const User = require("../models/user.model");

exports.getUserInfo = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      console.error("User ID not found in request");
      return res.status(400).json({ message: "Invalid request" });
    }

    const userId = req.user._id;
    console.log(`Fetching user info for ID: ${userId}`);

    const user = await User.findById(userId).select(
      "nickname pet city district"
    );
    if (!user) {
      console.error("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ message: "Server error" });
  }
};
