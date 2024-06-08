const express = require("express");
const router = express.Router();
const multer = require("multer");
const ProfileImage = require("../models/profile.model");
const path = require("path");

// Multer 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// 이미지 업로드 라우트
router.post("/profile", upload.single("image"), async (req, res) => {
  const imageName = req.file.filename;
  const userId = req.body.userId; // 클라이언트에서 userId를 보내야 함

  try {
    await ProfileImage.create({ filename: imageName, userId });
    res.json({ status: "success", filename: imageName });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});

// 이미지 대체(업데이트) 라우트
router.put("/profile", upload.single("image"), async (req, res) => {
  const imageName = req.file.filename;
  const userId = req.body.userId;

  try {
    const existingImage = await ProfileImage.findOne({ userId });
    if (existingImage) {
      // 기존 파일 삭제
      const oldFile = path.resolve(
        __dirname,
        "../uploads",
        existingImage.filename
      );
      fs.unlink(oldFile, (err) => {
        if (err) {
          console.error("Error deleting old file:", err);
        }
      });

      // 새로운 파일명으로 업데이트
      existingImage.filename = imageName;
      await existingImage.save();
    } else {
      // 새로운 이미지 저장
      await ProfileImage.create({ filename: imageName, userId });
    }
    res.json({ status: "success", filename: imageName });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});

// 이미지 가져오기 라우트 (userId 기준)
router.get("/profile/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const profileImage = await ProfileImage.findOne({ userId });
    if (!profileImage) {
      return res
        .status(404)
        .json({ status: "error", message: "이미지를 찾을 수 없습니다." });
    }
    const file = path.resolve(__dirname, "../uploads", profileImage.filename);
    res.sendFile(file);
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

module.exports = router;
