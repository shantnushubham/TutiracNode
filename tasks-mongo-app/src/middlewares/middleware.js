const { verifyToken } = require("../jwt");
const User = require("../models/User");

const myMiddleware = (req, res, next) => {
  return res.status(503).send({ message: "This server is under maintenance." });
};

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.replace("Bearer ", "");
  const { status, payload } = await verifyToken(token);
  const errorObject = { message: "Please authenticate." };
  if (status) {
    const { _id } = payload;
    const user = await User.findOne({ _id, "tokens.token": token });
    if (!user) {
      return res.status(403).send(errorObject);
    }
    req.user = user;
    req.token = token;
    next();
  } else {
    return res.status(403).send(errorObject);
  }
};

module.exports = { myMiddleware, authMiddleware };
