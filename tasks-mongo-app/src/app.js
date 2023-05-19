require("./appMongoose");
const express = require("express");
const User = require("./models/User");
const Task = require("./models/Task");

const app = express();

const PORT = 8080;

app.use(express.json());

app.post("/users/add", (req, res) => {
  console.log(req.body);
  const { name, email, age, password } = req.body;
  const user = new User({ name, email, age, password });
  user
    .save()
    .then(() => {
      console.log("Saved.");
      return res.status(201).send(user);
    })
    .catch((err) => {
      console.error("Not Saved", err);
      return res.status(400).send({
        message: err,
      });
    });
});

app.get("/users/all", (req, res) => {
  User.find()
    .then((foundUsers) => {
      console.log(foundUsers);
      return res.status(200).send(foundUsers);
    })
    .catch((error) => {
      console.error("Error: ", error);
      return res.status(500).send({ message: error });
    });
});

app.get("/user/:_id", (req, res) => {
  const { _id } = req.params;
  User.findOne({ _id })
    .then((foundUser) => {
      if (!foundUser) {
        const message = `User with ID: ${_id} was not found.`;
        console.error(message);
        return res.status(404).send({ message });
      }
      console.info(`User with ID: ${_id} was successfully found.`);
      return res.status(200).send(foundUser);
    })
    .catch((err) => {
      console.error("Error: ", err);
      return res.status(500).send({ message: err });
    });
});

app.patch("/users/make-eligible", markUsersAsEligible);

app.put("/user/:_id", (req, res) => {
  const { _id } = req.params;
  User.updateOne({ _id }, { $set: { age: 25 } })
    .then(({ matchedCount }) => {
      if (!matchedCount) {
        const message = `User with ID: ${_id} was not found.`;
        console.warn(message);
        return res.status(404).send({ message });
      }
      console.info(`User with ID: ${_id} was successfully updated.`);
      return res.status(200).send(true);
    })
    .catch((err) => {
      return res.status(500).send({ message: err });
    });
});

app.delete("/user/:_id", (req, res) => {
  const { _id } = req.params;
  User.deleteOne({ _id })
    .then(({ deletedCount }) => {
      if (!deletedCount) {
        const message = `User with ID: ${_id} is not found.`;
        console.error(message);
        return res.status(404).send({ message });
      }
      console.info(`User with ID: ${_id} was successfully deleted.`);
      return res.status(200).send(true);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).send({ message: error });
    });
});

app.get("/task/:_id", (req, res) => {
  const { _id } = req.params;
  Task.findOne({ _id })
    .then((foundTask) => {
      if (!foundTask) {
        const message = `Task with ID: ${_id} was not found.`;
        console.error(message);
        return res.status(404).send({ message });
      }
      console.info(`Task with ID: ${_id} was successfully found.`);
      return res.status(200).send(foundTask);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err });
    });
});

app.post("/tasks/add", (req, res) => {
  const taskToAdd = req.body;
  const task = new Task({ ...taskToAdd });
  task
    .save()
    .then(() => {
      console.log(`New Task with ID: ${task.id} was successfully created.`);
      return res.status(201).send(task);
    })
    .catch((error) => {
      console.error(error);
      return res.status(400).send({ message: error });
    });
});

app.get("/tasks/all", (req, res) => {
  Task.find()
    .then((foundTasks) => {
      console.log(`Found ${foundTasks.length} tasks.`);
      return res.status(200).send(foundTasks);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).send({ message: error });
    });
});

app.put("/task/:_id", (req, res) => {
  const { _id } = req.params;
  const { title, description } = req.body;
  Task.updateOne({ _id }, { $set: { title, description } })
    .then(({ matchedCount }) => {
      if (!matchedCount) {
        const message = `Task with ID: ${_id} is not found.`;
        console.error(message);
        return res.status(404).send({ message });
      }
      console.info(`Task with ID: ${_id} was successfully updated.`);
      return res.status(200).send(true);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err });
    });
});

app.patch("/task/mark-complete", (req, res) => {
  Task.updateMany({ isComplete: false }, { $set: { isComplete: true } })
    .then(({ matchedCount }) => {
      const message = `${matchedCount} tasks were found and updated.`;
      console.info(message);
      return res.status(200).send({ message });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).send({ message: error });
    });
});

app.delete("/task/:_id", (req, res) => {
  const { _id } = req.params;
  Task.deleteOne({ _id })
    .then(({ deletedCount }) => {
      if (!deletedCount) {
        const message = `Task with ID: ${_id} is not found.`;
        console.error(message);
        return res.status(404).send({ message });
      }
      console.info(`Task with ID: ${_id} was successfully deleted.`);
      return res.status(200).send(true);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).send({ message: error });
    });
});

app.listen(PORT, () => {
  console.log("Tasks App is successfully running.");
});

function markUsersAsEligible(req, res) {
  User.updateMany(
    { $and: [{ age: { $gte: 20 } }, { age: { $lte: 24 } }] },
    {
      $set: {
        isEligible: true,
      },
    }
  )
    .then(({ matchedCount }) => {
      const message = `${matchedCount} users were found and updated.`;
      console.info(message);
      return res.status(200).send({ message });
    })
    .catch((err) => res.status(500).send({ message: err }));
}
