const express = require("express");
const {
  addNewUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  markUsersAsEligible,
  loginUser
} = require("../services/user-service");

const router = express.Router();

router.post("/add", addNewUser);
router.get("/get/all", getAllUsers);
router.get("/:_id", getUserById);
router.put("/:_id", updateUserById);
router.delete("/:_id", deleteUserById);
router.patch("/mark-eligible", markUsersAsEligible);
router.post("/login", loginUser)

module.exports = router;
