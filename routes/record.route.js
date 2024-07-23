// routes/recordRoutes.js
const express = require("express");
const multer = require("multer");
const {
  getAllRecords,
  getUserRecords,
  createRecord,
} = require("../controllers/record.controllers");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

// 기록 작성
router.post("/", upload.array("images", 4), createRecord);

// 모든 기록 가져오기
router.get("/", getAllRecords);

// 특정 사용자의 기록 가져오기
router.get("/user/:userId", getUserRecords);

module.exports = router;
