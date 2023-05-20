const express = require("express");
const {
  getTaskById,
  addNewTask,
  updateTaskById,
  deleteTaskById,
  marlTasksAsComplete,
  getAllTasks,
} = require("../services/task-service");
const { authMiddleware } = require("../middlewares/middleware");

const router = express.Router();

router.get("/get/all", getAllTasks);
router.get("/:_id", getTaskById);
router.post("/add", authMiddleware, addNewTask);
router.put("/:_id", updateTaskById);
router.delete("/:_id", deleteTaskById);
router.patch("/mark-complete", marlTasksAsComplete);

module.exports = router;
