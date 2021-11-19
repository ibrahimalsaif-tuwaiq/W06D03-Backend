const fs = require("fs");

const getTodos = (req, res) => {
  const userObject = req.body;

  fs.readFile("./db/usersTodo.json", (err, data) => {
    const users = JSON.parse(data.toString());

    const loggedinUser = users.find(
      (user) => user.username == userObject.username
    );

    if (loggedinUser) {
      res.status(200).json(loggedinUser.todos);
    } else {
      res.json("Your todo is empty");
    }
  });
};

const addTodo = (req, res) => {
  const userObject = req.body;

  fs.readFile("./db/usersTodo.json", (err, data) => {
    const users = JSON.parse(data.toString());

    const loggedinUser = users.find(
      (user) => user.username == userObject.username
    );

    if (loggedinUser && userObject.todo.length) {
      if (loggedinUser.todos.length === 0) {
        users[loggedinUser.id - 1].todos.push({ id: 1, todo: userObject.todo });
        fs.writeFile("./db/usersTodo.json", JSON.stringify(users), () => {
          res.status(200).json(users[loggedinUser.id - 1].todos);
        });
      } else {
        users[loggedinUser.id - 1].todos.push({
          id:
            users[loggedinUser.id - 1].todos[
              users[loggedinUser.id - 1].todos.length - 1
            ].id + 1,
          todo: userObject.todo,
        });
        fs.writeFile("./db/usersTodo.json", JSON.stringify(users), () => {
          res.status(200).json(users[loggedinUser.id - 1].todos);
        });
      }
    } else {
      res.json("You have to login first!!");
    }
  });
};

const updateTodo = (req, res) => {
  const dataObject = req.body;
  const todoId = req.params.id;

  fs.readFile("./db/usersTodo.json", (err, data) => {
    const users = JSON.parse(data.toString());

    const loggedinUser = users.find(
      (user) => user.username == dataObject.username
    );

    if (loggedinUser) {
      users[loggedinUser.id - 1].todos[todoId - 1].todo = dataObject.todo;
      fs.writeFile("./db/usersTodo.json", JSON.stringify(users), () => {
        res.status(200).json(users[loggedinUser.id - 1].todos);
      });
    } else {
      res.json("You have to login first!!");
    }
  });
};

const deleteTodo = (req, res) => {
  const userObject = req.body;
  const todoId = req.params.id;

  fs.readFile("./db/usersTodo.json", (err, data) => {
    const users = JSON.parse(data.toString());

    const loggedinUser = users.find(
      (user) => user.username == userObject.username
    );

    if (loggedinUser) {
      users[loggedinUser.id - 1].todos = users[loggedinUser.id - 1].todos.filter((todo) => todo.id != todoId);
      fs.writeFile("./db/usersTodo.json", JSON.stringify(users), () => {
        res.status(200).json(users[loggedinUser.id - 1].todos);
      });
    } else {
      res.json("You have to login first!!");
    }
  });
};

module.exports = { getTodos, addTodo, updateTodo, deleteTodo };
