const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "아이디와 비밀번호를 입력해 주세요." });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "아이디 또는 비밀번호가 잘못되었습니다.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "아이디 또는 비밀번호가 잘못되었습니다.",
      });
    }
    const payload = {
      user: {
        _id: user._id, // _id 사용
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ success: true, message: "로그인 성공", token });
  } catch (error) {
    console.error("로그인 중 오류 발생:", error);
    res
      .status(500)
      .json({ success: false, message: "로그인 중 오류가 발생했습니다." });
  }
};
