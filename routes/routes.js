const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcryptjs'); 


// POST endpoint to create a new user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, isAdmin } = req.body;
    
    const existingUser = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email is already taken.' });
    }
    
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

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


router.post('/login', async(req, res) => {
    const { username, password } = req.body; 
  try { 
    const user = await User.findOne({ username }); 
    if(!user || user.password !== password) {
      res.status(401).json({ message: "Invalid username or password" }); 
      return;
    }
    
    res.json({ message: 'Login Successful', user});
  } catch(error) {
    console.error(error); 
    res.status(500).json({ message: "Internal Server Error" });
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
