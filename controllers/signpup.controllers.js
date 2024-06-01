const User = require("../models/user.model");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  const { username, password, nickname, pet } = req.body;

  if (!username || !password || !nickname || !pet) {
    return res
      .status(400)
      .json({ success: false, message: "모든 필드를 입력해 주세요." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      nickname,
      pet,
    });

    await newUser.save();
    res.status(201).json({ success: true, message: "회원가입 성공" });
  } catch (error) {
    console.error("회원가입 중 오류 발생:", error);
    res
      .status(500)
      .json({ success: false, message: "회원가입 중 오류가 발생했습니다." });
  }
};
