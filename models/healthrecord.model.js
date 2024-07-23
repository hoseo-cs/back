const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    weight: { type: String, required: true },
    age: { type: String, required: true },
    medications: { type: String, required: true },
    meetingPlace: { type: String, required: true },
    breed: { type: String, required: true },
    disease: { type: String, required: true },
    images: { type: [String], required: true },
  },
  { timestamps: true, collection: "records" }
);

module.exports = mongoose.model("Record", recordSchema);
