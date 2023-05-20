require("./appMongoose");
const express = require("express");
const userRoute = require("./routes/user-routes");
const taskRoute = require("./routes/task-route");

const app = express();

const PORT = 8080;

app.use(express.json());

app.use("/user", userRoute);

app.use("/task", taskRoute);

app.listen(PORT, () => {
  console.log("Tasks App is successfully running.");
});
