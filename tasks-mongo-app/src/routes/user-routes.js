const express = require("express");
const {
  addNewUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  markUsersAsEligible,
  loginUser,
  logoutUser,
  logoutAllForUser,
} = require("../services/user-service");
const { authMiddleware } = require("../middlewares/middleware");

const router = express.Router();

router.post("/add", addNewUser);
router.get("/get/all", authMiddleware, getAllUsers);
router.get("/:_id", authMiddleware, getUserById);
router.put("/me", authMiddleware, updateUser);
router.delete("/me", authMiddleware, deleteUser);
router.patch("/mark-eligible", authMiddleware, markUsersAsEligible);
router.post("/login", loginUser);
router.post("/logout", authMiddleware, logoutUser);
router.post("/logoutAll", authMiddleware, logoutAllForUser);

module.exports = router;
