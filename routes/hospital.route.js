const express = require("express");
const router = express.Router();
const {
  createHospital,
  updateHospital,
  deleteHospital,
  findByRegion,
} = require("../controllers/product.controller.js");

// router.get("/", getProducts);

router.get("/", findByRegion);

router.post("/", createHospital);

router.put("/:id", updateHospital);

router.delete("/:id", deleteHospital);

module.exports = router;
