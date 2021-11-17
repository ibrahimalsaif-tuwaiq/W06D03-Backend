const fs = require("fs");

const signup = (req, res) => {
  const newUser = req.body;
  let response;
  let status;

  fs.readFile("./db/usersTodo.json", (err, data) => {
    const users = JSON.parse(data.toString());

    if (users.length != 0) {
      users.forEach((user) => {
        if (user.username == newUser.username || user.email == newUser.email) {
          response = "Username or Email already exists";
          status = 401;
          return;
        } else {
          users.push({
            username: newUser.username,
            email: newUser.email,
            password: newUser.password,
            todos: [],
          });
          fs.writeFile("./db/usersTodo.json", JSON.stringify(users), () => {});
          response = "User added";
          status = 201;
          return;
        }
      });
    } else {
      users.push({
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        todos: [],
      });
      fs.writeFile("./db/usersTodo.json", JSON.stringify(users), () => {});
      response = "User added";
      status = 201;
    }

    if (status == 201) {
      res.status(status).json(response);
    } else {
      res.json(response);
    }
  });
};

module.exports = signup;
