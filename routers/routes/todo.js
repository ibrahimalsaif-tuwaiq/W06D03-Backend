const express = require("express");

const {getTodos, addTodo, updateTodo, deleteTodo} = require("../controllers/todo");

const todoRouter = express.Router();

todoRouter.post("/getAll", getTodos);
todoRouter.post("/add", addTodo);
todoRouter.put("/update/:id", updateTodo);
todoRouter.put("/delete/:id", deleteTodo);

module.exports = todoRouter;