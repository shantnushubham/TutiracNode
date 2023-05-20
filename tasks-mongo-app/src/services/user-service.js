const User = require("../models/User");

const SUPPORTED_UPDATES = ["name", "isEligible", "age", "password"];

const addNewUser = (req, res) => {
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
};

const getAllUsers = (req, res) => {
  User.find()
    .then((foundUsers) => {
      console.log(foundUsers);
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

const updateUserById = (req, res) => {
  const { _id } = req.params;
  const paramsToUpdate = Object.keys(req.body);
  const isValidUpdate = paramsToUpdate.every((param) =>
    SUPPORTED_UPDATES.includes(param)
  );
  if (!isValidUpdate) {
    const message = `Invalid parameters are passed. You can only update: ${SUPPORTED_UPDATES.toString()}`;
    console.warn(message);
    return res.status(400).send({ message });
  }
  User.findById(_id).then((user) => {
    if (!user) {
      const message = `User with ID: ${_id} was not found.`;
      console.warn(message);
      return res.status(404).send({ message });
    }
    paramsToUpdate.forEach((param) => {
      user[param] = req.body[param];
    });
    user
      .save()
      .then(() => {
        console.info(`User with ID: ${_id} was successfully updated.`);
        return res.status(200).send(true);
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).send({ message: err });
      });
  });
};

const deleteUserById = (req, res) => {
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

const loginUser = (req, res) => {
  const { email, password } = req.body;
  User.findByEmailAndPasswordForAuth(email, password)
    .then((user) => {
      console.info(`User with email: ${email} successfully signed in.`);
      return res.status(200).send(user);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: "Login Failed!" });
    });
};

module.exports = {
  addNewUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  markUsersAsEligible,
  loginUser,
};
