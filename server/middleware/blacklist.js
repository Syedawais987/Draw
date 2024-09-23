const Blacklist = require("../models/Blacklist");

const checkBlacklist = async (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];

  if (token) {
    const isBlacklisted = await Blacklist.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ msg: "Token is invalid" });
    }
  }

  next();
};

module.exports = checkBlacklist;
