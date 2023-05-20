const Task = require("../models/Task");

const getTaskById = (req, res) => {
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
};

const addNewTask = (req, res) => {
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
};

const getAllTasks = (req, res) => {
  Task.find()
    .then((foundTasks) => {
      console.log(`Found ${foundTasks.length} tasks.`);
      return res.status(200).send(foundTasks);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).send({ message: error });
    });
};

const updateTaskById = (req, res) => {
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
};

const deleteTaskById = (req, res) => {
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
};

const marlTasksAsComplete = (req, res) => {
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
};

module.exports = {
  getTaskById,
  addNewTask,
  getAllTasks,
  updateTaskById,
  deleteTaskById,
  marlTasksAsComplete,
};
