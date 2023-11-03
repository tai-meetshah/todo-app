const createError = require("http-errors");
const Todo = require("../../models/todoModel");

exports.addTodo = async (req, res, next) => {
  try {
    await Todo.create(req.body);
    res.status(201).json({ success: true, message: "Data added successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id)
      .select("-__v -updatedAt")
      .sort({ createdAt: "desc" });
    res.json({ success: true, todo });
  } catch (error) {
    next(error);
  }
};

exports.getAllTodo = async (req, res, next) => {
  try {
    const todo = await Todo.find()
      .select("-__v -updatedAt")
      .sort({ createdAt: "desc" });
    res.json({ success: true, todo });
  } catch (error) {
    next(error);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    await Todo.deleteOne({ _id: req.params.id });
    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    await Todo.findOneAndUpdate(
      { _id: req.params.id },
      { todo: req.body.todo, done: req.body.done },
      { new: true }
    );
    res.json({ success: true, message: "Data updated successfully" });
  } catch (error) {
    next(error);
  }
};
