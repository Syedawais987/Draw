const Blacklist = require("../models/Blacklist");

const checkBlacklist = async (req, res, next) => {
  // Ensure the Authorization header exists
  const authHeader = req.headers["authorization"];

  // If there's no authorization header, return an error
  if (!authHeader) {
    return res.status(401).json({ msg: "Authorization header is missing" });
  }

  const token = authHeader.split(" ")[1]; // Extract token from Bearer scheme

  // Check if the token is present
  if (!token) {
    return res.status(401).json({ msg: "Token is missing or malformed" });
  }

  try {
    // Check if the token is blacklisted
    const isBlacklisted = await Blacklist.findOne({ token });

    if (isBlacklisted) {
      return res
        .status(401)
        .json({ msg: "User Already logged out. Sign in First!" });
    }
    console.log("proceeding");
    // If token is not blacklisted, proceed to the next middleware
    next();
  } catch (err) {
    // Handle any errors that occur during the DB check
    console.error("Error checking token blacklist:", err);
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports = checkBlacklist;
