const fs = require("fs");

const login = (req, res) => {
  const loginUser = req.body;
  let userNotFound = true;
  let response;
  let status;

  fs.readFile("./db/usersTodo.json", (err, data) => {
    const users = JSON.parse(data.toString());

    users.forEach((user) => {
      if (
        user.username == loginUser.identifier ||
        user.email == loginUser.identifier
      ) {
        if (user.password == loginUser.password) {
          userNotFound = false;
          response = user;
          status = 200;
          return;
        } else {
          userNotFound = false;
          response = "Password is incorrect";
          status = 401;
          return;
        }
      }
    });

    if (userNotFound) {
      response = "Username or Email doesn't exists";
      status = 401;
    }

    if (status == 200) {
      res.status(status).json(response);
    } else {
      res.json(response);
    }
  });
};

module.exports = login;
