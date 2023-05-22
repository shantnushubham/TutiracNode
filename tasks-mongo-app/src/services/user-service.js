const User = require("../models/User");
const { deleteTasksOfUser } = require("./task-service");

const SUPPORTED_UPDATES = ["name", "isEligible", "age", "password"];

const addNewUser = async (req, res) => {
  try {
    const { name, email, age, password } = req.body;
    const user = new User({ name, email, age, password });
    await user.save();
    const token = await user.generateUserToken();
    return res.status(201).send({ user, token });
  } catch (err) {
    console.error("Not Saved", err);
    return res.status(400).send({
      message: err,
    });
  }
};

const getAllUsers = (req, res) => {
  User.find()
    .then((foundUsers) => {
      return res.status(200).send(foundUsers);
    })
    .catch((error) => {
      console.error("Error: ", error);
      return res.status(500).send({ message: error });
    });
};

const getUserById = (req, res) => {
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
};

const getUserInfoWithTasks = async (req, res) => {
  try {
    let user = req.user;
    await user.populate("tasks");
    return res.status(200).send(user);
  } catch (err) {
    console.error("Error: ", err);
    return res.status(500).send({ message: err });
  }
};

const updateUser = async (req, res) => {
  try {
    const paramsToUpdate = Object.keys(req.body);
    const isValidUpdate = paramsToUpdate.every((param) =>
      SUPPORTED_UPDATES.includes(param)
    );
    if (!isValidUpdate) {
      const message = `Invalid parameters are passed. You can only update: ${SUPPORTED_UPDATES.toString()}`;
      console.warn(message);
      return res.status(400).send({ message });
    }
    const { user } = req;
    paramsToUpdate.forEach((param) => {
      user[param] = req.body[param];
    });
    await user.save();
    console.info(`User with ID: ${user._id} was successfully updated.`);
    return res.status(200).send(true);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: err });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user } = req;
    await User.deleteOne({ _id: user._id });
    await deleteTasksOfUser(user._id);
    console.info(`User with ID: ${user._id} was successfully deleted.`);
    return res.status(200).send(true);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error });
  }
};

const markUsersAsEligible = (req, res) => {
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
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmailAndPasswordForAuth(email, password);
    const token = await user.generateUserToken();
    console.info(`User with email: ${email} successfully signed in.`);
    return res.status(200).send({ user, token });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Login Failed!" });
  }
};

const logoutUser = async (req, res) => {
  try {
    const { token, user } = req;
    user.tokens = user.tokens.filter((presentToken) => {
      return presentToken.token !== token;
    });
    user.save();
    return res.status(200).send();
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: err });
  }
};

const logoutAllForUser = async (req, res) => {
  const { token, user } = req;
  user.tokens = [];
  user.save();
  return res.status(200).send();
};

module.exports = {
  addNewUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  markUsersAsEligible,
  loginUser,
  logoutUser,
  logoutAllForUser,
  getUserInfoWithTasks,
};
