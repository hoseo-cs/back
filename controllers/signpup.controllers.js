const User = require("../models/user.model");

exports.signup = async (req, res) => {
  const { username, password, nickname, pet } = req.body;

  if (!username || !password || !nickname || !pet) {
    return res
      .status(400)
      .json({ success: false, message: "모든 필드를 입력해 주세요." });
  }

  try {
    const newUser = await User.create({ username, password, nickname, pet });
    res
      .status(200)
      .json({ success: true, message: "회원가입 성공", user: newUser });
  } catch (error) {
    console.error("회원가입 중 오류 발생:", error);
    res
      .status(500)
      .json({ success: false, message: "회원가입 중 오류가 발생했습니다." });
  }
};
