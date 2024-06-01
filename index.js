const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const hospitalRoute = require("./routes/hospital.route.js");

app.use(
  cors({
    origin: "http://localhost:3000", // 허용할 도메인
  })
);

const uri =
  "mongodb+srv://jaehunlee722:K2aqCSc2OfIawnK6@backenddb.ou8uab4.mongodb.net/node?retryWrites=true&w=majority&appName=BackendDB";

//node js에서는 json이 기본이 아니라서 미들웨어에서 처리해줘야함
app.use(express.json());

//form URL보낼시 사용 미들웨어에서 처리해줘야함
app.use(express.urlencoded({ extended: false }));

//라우팅 설정
//products에 대한건 product로
app.use("/api/hospitals", hospitalRoute);

// 라우트 설정
const signupRoute = require("./routes/signup");
app.use("/api/signup", signupRoute);

app.listen(3001, () => {
  console.log("서버 3001에서 돌아가는 중입니당");
}); //package.json에서 scripts에서 serve객체 설정하기.

app.get("/", (req, res) => {
  res.send("get요청 updated!!");
});

// app.post("/api/hospitals", (req, res) => {
//   console.log(req.body);
//   res.send("post요청 updated!!");
// });

mongoose
  .connect(uri)
  .then(async () => {
    console.log("-------몽고 db 연결 완료!--------");

    // 연결 종료 (조건부로 시행하기)
    // mongoose.connection.close();
  })
  .catch(() => {
    console.log("연결 실패");
  });

//nodemon 쓰면 바로 반영해줌.

//npm install mongodb
//npm install mongoose

//<password>에 비밀번호 넣기
//retry앞에(주소 끝나고) 본인 프로젝트 이름 넣기. 띄워쓰기는 - 처리.
