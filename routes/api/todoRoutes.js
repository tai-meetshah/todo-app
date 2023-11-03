const router = require("express").Router();
const todoController = require("../../controllers/api/todo");

router.get("/get-all", todoController.getAllTodo);
router.get("/:id", todoController.getTodo);
router.post("/add", todoController.addTodo);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
