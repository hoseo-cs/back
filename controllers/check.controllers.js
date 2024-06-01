const User = require("../models/user.model");

exports.checkUsername = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res
      .status(400)
      .json({ success: false, message: "아이디를 입력해 주세요." });
  }

  try {
    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(200)
        .json({ success: false, message: "이미 존재하는 아이디입니다." });
    }
    return res
      .status(200)
      .json({ success: true, message: "사용 가능한 아이디입니다." });
  } catch (error) {
    console.error("아이디 중복 체크 중 오류 발생:", error);
    res.status(500).json({
      success: false,
      message: "아이디 중복 체크 중 오류가 발생했습니다.",
    });
  }
};
