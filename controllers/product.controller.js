const Hospital = require("../models/hospital.model.js");

const findByRegion = async (req, res) => {
  try {
    const { region } = req.query;
    const query = region ? { region } : {};
    const products = await Hospital.find(query); // 특정 지역의 병원 불러오기
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createHospital = async (req, res) => {
  try {
    const product = await Hospital.create(req.body); //제품 생성해서 넣기
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
    //에러 메세지 보내는법
  }
};

const updateHospital = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Hospital.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).json({ message: "제품을 못 찾았어요" });
    }
    const updatedProduct = await Hospital.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "제품을 찾지 못했어요 ㅜㅜ" });
  }
};

const deleteHospital = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Hospital.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "제품을 못 찾았어요" });
    }

    res.status(200).json({ message: "삭제가 말끔히 되었어요@" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createHospital,
  updateHospital,
  deleteHospital,
  findByRegion,
};

/*

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Hospital.findById(id);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getProducts = async (req, res) => {
  try {
    const products = await Hospital.find({}); //모든 제품 다 불러오기
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

*/
