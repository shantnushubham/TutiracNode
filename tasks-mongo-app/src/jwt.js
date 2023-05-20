const jwt = require("jsonwebtoken");

const SECRET_KEY = "Tutorac-Signature1";

const generateToken = async (userId) => {
  const token = jwt.sign({ _id: userId }, SECRET_KEY);
  return token;
};

const verifyToken = async (token) => {
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    return { status: true, payload };
  } catch (err) {
    console.error(err);
    return { status: false, payload: undefined };
  }
};

module.exports = { generateToken, verifyToken };
