const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    todo: {
      type: String,
      required: [true, "Data is required."],
    },
    done: {
      type: String,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Todo", todoSchema);
