const fs = require("fs");

const getTodos = (req, res) => {
  const userObject = req.body;

  fs.readFile("./db/usersTodo.json", (err, data) => {
    const users = JSON.parse(data.toString());

    const loggedinUser = users.find(
      (user) => user.username == userObject.username
    );

    if (loggedinUser) {
      users.forEach((user) => {
        if (user.username == loggedinUser.username) {
          res.status(200).json(user.todos);
        }
      });
    } else {
      res.status(401).json("You have to login first!!");
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

    if (loggedinUser) {
      users.forEach((user) => {
        if (user.username == loggedinUser.username) {
          if (user.todos.length === 0) {
            user.todos.push({ id: 1, todo: userObject.todo });
            fs.writeFile("./db/usersTodo.json", JSON.stringify(users), () => {
              res.status(200).json(user.todos);
            });
          } else {
            user.todos.push({
              id: user.todos[user.todos.length - 1].id + 1,
              todo: userObject.todo,
            });
            fs.writeFile("./db/usersTodo.json", JSON.stringify(users), () => {
              res.status(200).json(user.todos);
            });
          }
        }
      });
    } else {
      res.status(401).json("You have to login first!!");
    }
  });
};

const updateTodo = (req, res) => {
  const userObject = req.body;

  fs.readFile("./db/usersTodo.json", (err, data) => {
    const users = JSON.parse(data.toString());

    const loggedinUser = users.find(
      (user) => user.username == userObject.username
    );

    if (loggedinUser) {
      users.forEach((user) => {
        if (user.username == loggedinUser.username) {
          user.todos[userObject.id - 1].todo = userObject.todo;
          fs.writeFile("./db/usersTodo.json", JSON.stringify(users), () => {
            res.status(200).json(user.todos);
          });
        }
      });
    } else {
      res.status(401).json("You have to login first!!");
    }
  });
};

const deleteTodo = (req, res) => {
  // deleteTodo
};

module.exports = { getTodos, addTodo, updateTodo, deleteTodo };
