const { model, default: mongoose } = require("mongoose");

const TaskModel = model("Task", {
  title: {
    type: String,
    required: true,
  },
  description: { type: String, required: true },
  isComplete: { type: Boolean, default: false },
  owner: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "User" },
});

module.exports = TaskModel;
