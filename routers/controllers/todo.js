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
  // addTodo
};

const updateTodo = (req, res) => {
  // updateTodo
};

const deleteTodo = (req, res) => {
  // deleteTodo
};

module.exports = { getTodos, addTodo, updateTodo, deleteTodo };
