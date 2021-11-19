const fs = require("fs");

const signup = (req, res) => {
  const newUser = req.body;

  fs.readFile("./db/usersTodo.json", (err, data) => {
    const users = JSON.parse(data.toString());

    if (users.length != 0) {
      const existUser = users.find(
        (user) =>
          user.username == newUser.username || user.email == newUser.email
      );
      if (existUser) res.json("Username or Email already exists");
      else {
        users.push({
          id: users[users.length - 1].id + 1,
          username: newUser.username,
          email: newUser.email,
          password: newUser.password,
          todos: [],
        });
        fs.writeFile("./db/usersTodo.json", JSON.stringify(users), () => {
          res.status(201).json("User added");
        });
      }
    } else {
      users.push({
        id: 1,
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        todos: [],
      });
      fs.writeFile("./db/usersTodo.json", JSON.stringify(users), () => {
        res.status(201).json("User added");
      });
    }
  });
};

module.exports = signup;
