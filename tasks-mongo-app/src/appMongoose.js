const { connect } = require("mongoose");

const MONGO_URL = "mongodb+srv://root:roota@tutoraccluster.udjbnbd.mongodb.net";

connect(`${MONGO_URL}/tasks`)
  .then(() => {
    console.log("Connection Success!");
  })
  .catch((err) => console.error(err));

module.exports = {};
