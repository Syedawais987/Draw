// routes/user.js
const express = require("express");
const { check } = require("express-validator");
const passport = require("passport");
const checkBlacklist = require("../middleware/blacklist");
const {
  registerUser,
  loginUser,
  getProtected,
  logoutUser,
} = require("../controllers/userController");

const router = express.Router();

// @route   POST api/users/register
// @desc    Register a new user
// @access  Public
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be 6 or more characters").isLength({
      min: 6,
    }),
  ],
  registerUser
);

// @route   POST api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  loginUser
);

// @route   POST api/users/logout
// @desc    Logout user (clear token)
// @access  Public
router.post("/logout", logoutUser);

// @route   GET api/users/protected
// @desc    Protected route example
// @access  Private
router.get(
  "/protected",
  checkBlacklist,
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ msg: "Access granted to protected route", user: req.user });
  }
);

module.exports = router;
