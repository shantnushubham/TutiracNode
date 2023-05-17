const mongoose = require("mongoose");
const Task = require("./models/Task");
const User = require("./models/User");

const MONGO_URL = "mongodb+srv://root:roota@tutoraccluster.udjbnbd.mongodb.net";

mongoose
  .connect(`${MONGO_URL}/tasks`)
  .then(() => {
    console.log("Connection Success!");
  })
  .catch((err) => console.error(err));

// const myTask = new Task({
//   title: "Eat Lunch",
//   description: ["Vegetables", "Rice"],
// });

// myTask
//   .save()
//   .then(() => console.log("Saved!", myTask))
//   .catch((error) => console.error(error));

const myUser = new User({
  name: " Shantanu Shubham    ",
  email: " SHANTANU_S@EMAIL.COM    ",
  age: 24,
  password: "Password123",
});

myUser
  .save()
  .then(() => console.log(myUser))
  .catch((e) => console.error(e));
