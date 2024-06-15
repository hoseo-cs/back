const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const envFilePath = path.resolve(__dirname, "../.env");

function generateSecretKey() {
  return crypto.randomBytes(64).toString("hex");
}

function updateEnvFile(newSecretKey) {
  let envFileContent = fs.readFileSync(envFilePath, "utf8");
  const newContent = envFileContent.replace(
    /JWT_SECRET=.*/,
    `JWT_SECRET=${newSecretKey}`
  );
  fs.writeFileSync(envFilePath, newContent, "utf8");
}

function updateSecretKey() {
  const newSecretKey = generateSecretKey();
  updateEnvFile(newSecretKey);
  //console.log("JWT 시크릿 키가 업데이트됨!:", newSecretKey);
}

// 3시간마다 시크릿 키 업데이트
setInterval(updateSecretKey, 3 * 60 * 60 * 1000);

module.exports = {
  generateSecretKey,
  updateSecretKey,
};
