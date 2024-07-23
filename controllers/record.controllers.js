// controllers/recordController.js
const Record = require("../models/healthrecord.model");

const createRecord = async (req, res) => {
  const { name, weight, age, medications, meetingPlace, breed, disease } =
    req.body;
  const imageFiles = req.files;

  const imagePaths = imageFiles.map((file) => file.filename);

  try {
    const newRecord = new Record({
      name,
      weight,
      age,
      medications,
      meetingPlace,
      breed,
      disease,
      images: imagePaths,
    });

    await newRecord.save();
    res.setHeader("Content-Type", "application/json");
    res.json({ status: "success", record: newRecord });
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ status: "error", error: error.message });
  }
};

const getAllRecords = async (req, res) => {
  try {
    const records = await Record.find();
    res.setHeader("Content-Type", "application/json");
    res.json({ status: "success", records });
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ status: "error", error: error.message });
  }
};

const getUserRecords = async (req, res) => {
  const { userId } = req.params;
  try {
    const records = await Record.find({ userId });
    res.json({ status: "success", records });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

module.exports = {
  createRecord,
  getAllRecords,
  getUserRecords,
};
