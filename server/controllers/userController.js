const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const Blacklist = require("../models/Blacklist");

// JWT secret
const { JWT_SECRET } = process.env;

// Register a new user
const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create new user
    user = new User({ name, email, password });
    await user.save();

    // Create JWT token
    const payload = { id: user.id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Login a user and return token
const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Example protected route
const getProtected = async (req, res) => {
  res.json({ msg: "Access granted to protected route", user: req.user });
};
const logoutUser = async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Get token from header

  if (token) {
    // Add the token to the blacklist
    const newBlacklistEntry = new Blacklist({ token });
    await newBlacklistEntry.save();
  }

  res.json({ msg: "Logout successful" });
};

// Export the logoutUser function along with other controller functions
module.exports = {
  registerUser,
  loginUser,
  getProtected,
  logoutUser,
};
