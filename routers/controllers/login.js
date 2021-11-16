const fs = require("fs");

const login = (req, res) => {
  const loginUser = req.body;
  let userNotFound = true;

  fs.readFile("./db/usersTodo.json", (err, data) => {
    const users = JSON.parse(data.toString());

    users.forEach((user) => {
      if (
        user.username == loginUser.identifier ||
        user.email == loginUser.identifier
      ) {
        if (user.password == loginUser.password) {
          userNotFound = false;
          res.status(200).json(user);
        } else {
          userNotFound = false;
          res.status(401).json("Password is incorrect");
        }
      }
    });

    if (userNotFound) {
      res.status(401).json("Username or Email doesn't exists");
    }
  });
};

module.exports = login;
