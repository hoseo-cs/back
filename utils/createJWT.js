const crypto = require("crypto");

function generateSecretKey() {
  return crypto.randomBytes(64).toString("hex");
}

function updateSecretKey() {
  const newSecretKey = generateSecretKey();
  // 환경 변수를 직접 갱신할 수는 없지만, 갱신된 키를 사용하여 JWT를 생성할 수 있습니다.
  process.env.JWT_SECRET = newSecretKey;
  console.log("JWT 시크릿 키가 업데이트됨!:", newSecretKey);
}

// 3시간마다 시크릿 키 업데이트
setInterval(updateSecretKey, 3 * 60 * 60 * 1000);

module.exports = {
  generateSecretKey,
  updateSecretKey,
};

// const crypto = require("crypto");
// const fs = require("fs");
// const path = require("path");

// const envFilePath = path.resolve(__dirname, "../.env");

// function generateSecretKey() {
//   return crypto.randomBytes(64).toString("hex");
// }

// function updateEnvFile(newSecretKey) {
//   let envFileContent = fs.readFileSync(envFilePath, "utf8");
//   const newContent = envFileContent.replace(
//     /JWT_SECRET=.*/,
//     `JWT_SECRET=${newSecretKey}`
//   );
//   fs.writeFileSync(envFilePath, newContent, "utf8");
// }

// function updateSecretKey() {
//   const newSecretKey = generateSecretKey();
//   updateEnvFile(newSecretKey);
//   //console.log("JWT 시크릿 키가 업데이트됨!:", newSecretKey);
// }

// // 3시간마다 시크릿 키 업데이트
// setInterval(updateSecretKey, 3 * 60 * 60 * 1000);

// module.exports = {
//   generateSecretKey,
//   updateSecretKey,
// };
