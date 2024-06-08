const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    images: { type: [String], default: [] },
    userId: { type: String, required: true },
  },
  { timestamps: true, collection: "posts" }
);

module.exports = mongoose.model("Post", postSchema);
