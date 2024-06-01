const mongoose = require("mongoose");

const animalHospitalSchema = new mongoose.Schema({
  region: { type: String, required: true },
  address: { type: String, required: true },
  name: { type: String, required: true },
  treatedAnimals: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

const Hospital = mongoose.model("hospital", animalHospitalSchema);
module.exports = Hospital;
