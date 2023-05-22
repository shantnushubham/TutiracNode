const TaskModel = require("../models/Task");
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

const addNewTask = async (req, res) => {
  try {
    const taskToAdd = req.body;
    let task = new Task({ ...taskToAdd, owner: req.user._id });
    await task.save();
    console.log(`New Task with ID: ${task.id} was successfully created.`);
    task = await task.populate("owner");
    return res.status(201).send(task);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: error });
  }
};

const getAllTasks = async (req, res) => {
  try {
    let user = req.user;
    let match = {};
    if (req.query.complete) {
      match.isComplete = req.query.complete === "true";
    }
    let options = {};
    let sort = {};
    if (req.query.pageSize) {
      options.skip =
        (parseInt(req.query?.pageNumber ?? 1) - 1) *
        parseInt(req.query.pageSize);
      options.limit = parseInt(req.query.pageSize);
    }
    if (req.query.sortBy) {
      let partsOfSortBy = req.query.sortBy.split(":");
      sort[partsOfSortBy[0]] = partsOfSortBy[1] === "asc" ? 1 : -1;
    }
    await user.populate({
      path: "tasks",
      match,
      options: {
        ...options,
        sort,
      },
    });
    let foundTasks = user.tasks;
    console.log(`Found ${foundTasks.length} tasks.`);
    return res.status(200).send(foundTasks);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error });
  }
};

const updateTaskById = (req, res) => {
  const { _id } = req.params;
  const userId = req.user._id;
  Task.updateOne({ _id, owner: userId }, { $set: { ...req.body } })
    .then(({ matchedCount }) => {
      if (!matchedCount) {
        const message = `Task with ID: ${_id} is not found for user with ID: ${userId}`;
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
  const userId = req.user._id;
  Task.deleteOne({ _id, owner: userId })
    .then(({ deletedCount }) => {
      if (!deletedCount) {
        const message = `Task with ID: ${_id} is not found for user with ID: ${userId}`;
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

const deleteTasksOfUser = (userId) => {
  const deletePromise = Task.deleteMany({ owner: userId });
  console.log(`Deleting tasks of User with ID: ${userId}`);
  return deletePromise;
};

module.exports = {
  getTaskById,
  addNewTask,
  getAllTasks,
  updateTaskById,
  deleteTaskById,
  marlTasksAsComplete,
  deleteTasksOfUser,
};
