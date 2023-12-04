const express = require("express");
const UserModel = require("../models/Users");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

// User Signup
app.post("/api/user/signup", async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    res.status(201).json({ user_created: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// User Login
app.post("/api/user/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Use a try-catch block for asynchronous password comparison
    try {
      const isMatch = await user.comparePassword(req.body.password);

      if (isMatch) {
        return res.status(200).json({
          status: true,
          username: req.body.username,
          message: "Login successful",
        });
      } else {
        return res.status(401).json({
          status: false,
          message: "Invalid username or password",
        });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = app;
