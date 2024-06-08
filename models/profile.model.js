const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { collection: "profileImage" }
);

module.exports = mongoose.model("Image", profileSchema);

//required 는 지켜야지 아니면 500 에러뜸.

// let reader = new FileReader();
// reader.readAsDataURL(e.target.files[0]);
// reader.onload = () => {
//   console.log(reader.result);
//   setImage(reader.result);
// };
// reader.onerror = (error) => {
//   console.log(error);
// };
