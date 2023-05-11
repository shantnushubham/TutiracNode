const validator = require("validator");

function verifyIfEmail(email) {
  if (validator.isEmail(email)) {
    console.log(`${email} is a valid email`);
    return true;
  }
  console.log(`${email} is an invalid email.`);
  console.log("Test");
  return false;
}

module.exports = { verifyIfEmail };
