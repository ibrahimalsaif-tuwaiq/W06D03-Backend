const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

// CONSTANTS
const PORT = process.env.PORT;

// Initiate The App
const app = express();

// App Level Middleware
app.use(express.json());
app.use(cors());

// Routers //

// Login
const loginRouter = require("./routers/routes/login");
app.use("/login", loginRouter);

// Signup
const signupRouter = require("./routers/routes/signup");
app.use("/signup", signupRouter);

// Todo
const todoRouter = require("./routers/routes/todo");
app.use("/todo", todoRouter);

// Start The App
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });