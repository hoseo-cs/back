const express = require("express");
const path = require("path");
const router = express.Router();
const multer = require("multer");
const Post = require("../models/post.model");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // 여기에 실제 이미지 저장 경로를 입력합니다.
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

// 게시물 작성
router.post("/", upload.array("images", 4), async (req, res) => {
  const { title, content, userId } = req.body;
  const imageFiles = req.files;

  const imagePaths = imageFiles.map((file) => file.filename);

  try {
    const newPost = new Post({
      title,
      content,
      images: imagePaths,
      userId,
    });

    await newPost.save();

    res.json({ status: "success", post: newPost });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

// 모든 게시물 가져오기
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json({ status: "success", posts });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

// 특정 사용자의 게시물 가져오기
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = await Post.find({ userId });
    res.json({ status: "success", posts });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});
// 특정 게시물 가져오기
router.get("/:postId", async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ status: "error", message: "게시물을 찾을 수 없습니다." });
    }
    res.json({ status: "success", post });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

// 이미지 파일 반환
router.get("/user/:userId/image/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "../uploads", filename);
  res.sendFile(filePath);
});

module.exports = router;
