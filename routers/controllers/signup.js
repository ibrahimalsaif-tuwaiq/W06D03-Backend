const fs = require("fs");

const signup = (req, res) => {
  const newUser = req.body.newUser;

  fs.readFile("./db/usersTodo.json", (err, data) => {
    const users = JSON.parse(data.toString());

    users.forEach((user) => {
      if (user.username == newUser.username && user.email == newUser.email) {
        res.status(403).json("Username or Email already exists");
      } else {
        users.push({
          username: newUser.username,
          email: newUser.email,
          password: newUser.password,
          todos: [],
        });
        fs.writeFile("./db/usersTodo.json", JSON.stringify(users), () => {
          res.status(200).json("User added");
        });
      }
    });
  });
};

module.exports = signup;
