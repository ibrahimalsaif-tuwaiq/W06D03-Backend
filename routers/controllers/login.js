const fs = require("fs");

const login = (req, res) => {
  const loginUser = req.body;

  fs.readFile("./db/usersTodo.json", (err, data) => {
    const users = JSON.parse(data.toString());

    const existUser = users.find(
      (user) =>
        user.username == loginUser.identifier ||
        user.email == loginUser.identifier
    );

    if (existUser) {
      if (existUser.password == loginUser.password) {
        res.status(200).json(existUser);
      } else {
        res.json("Password is incorrect");
      }
    } else {
      res.json("Username or Email doesn't exists");
    }
  });
};

module.exports = login;
