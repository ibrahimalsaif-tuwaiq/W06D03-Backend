const express = require("express");

const {getTodos, addTodo, updateTodo, deleteTodo} = require("../controllers/todo");

const todoRouter = express.Router();

todoRouter.get("/getAll", getTodos);
todoRouter.post("/add", addTodo);
todoRouter.put("/update", updateTodo);
todoRouter.delete("/delete", deleteTodo);

module.exports = todoRouter;