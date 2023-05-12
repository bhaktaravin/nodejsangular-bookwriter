const express = require("express");
const router = express.Router();
const User = require("../models/user");

// POST endpoint to create a new user
router.post("/users", async (req, res) => {
  try {
    const { username, email, password, isAdmin } = req.body;

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password,
      isAdmin,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
});

// GET endpoint to get all users (only accessible to admin users)
router.get("/users", async (req, res) => {
  try {
    // Check if user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).send({ message: "Forbidden" });
    }

    // Retrieve all users from the database
    const users = await User.find({}, { password: 0 });

    res.status(200).send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
});

// GET endpoint to get user profile
router.get("/users/me", async (req, res) => {
  try {
    // Retrieve user profile from database
    const user = await User.findById(req.user._id, { password: 0 });

    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
});

module.exports = router;
