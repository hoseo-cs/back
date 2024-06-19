const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

const signupRoute = require("./routes/signup");
const { checkUsername } = require("./controllers/check.controllers.js");
const loginRoute = require("./routes/login.route.js");
const userRoute = require("./routes/user.route.js");
const { updateSecretKey } = require("./utils/createJWT.js");
const uploadRoute = require("./routes/upload.route.js");
const postRoute = require("./routes/post.route.js");

app.use("/api/signup", signupRoute);
app.use("/api/check", checkUsername);
app.use("/api/login", loginRoute);
app.use("/api/user", userRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/post", postRoute);

app.get("/", (req, res) => {
  res.send("get요청 updated!!");
});

const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI, {
    family: 4,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("||-----------------몽고 db 연결 완료!-------------------||");
    updateSecretKey();
  })
  .catch((error) => {
    console.error("연결 실패: ", error);
  });

app.listen(3000, () => {
  console.log("------>>서버 3000에서 돌아가는 중입니당<<-------");
});
