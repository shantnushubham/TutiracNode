const bcrypt = require("bcryptjs");

const encryptPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 8);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const checkPassword = async (plainPassword, encryptedPassword) => {
  try {
    return await bcrypt.compare(plainPassword, encryptedPassword);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = { checkPassword, encryptPassword };
