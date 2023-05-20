const express = require("express");
const {
  getTaskById,
  addNewTask,
  updateTaskById,
  deleteTaskById,
  marlTasksAsComplete,
} = require("../services/task-service");

const router = express.Router();

router.get("/:_id", getTaskById);
router.post("/add", addNewTask);
router.put("/:_id", updateTaskById);
router.delete("/:_id", deleteTaskById);
router.patch("/mark-complete", marlTasksAsComplete);

module.exports = router;
