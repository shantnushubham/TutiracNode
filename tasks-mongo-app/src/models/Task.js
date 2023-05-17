const { model } = require("mongoose");

const TaskModel = model("Task", {
  title: {
    type: String,
    required: true,
  },
  description: { type: String, required: true },
  isComplete: { type: Boolean, default: false },
});

module.exports = TaskModel;
