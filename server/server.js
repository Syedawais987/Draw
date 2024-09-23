const express = require("express");
const cors = require("cors");
const passport = require("passport");
const connectDB = require("./config/db"); // DB connection
require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Passport Middleware
app.use(passport.initialize());
require("./middleware/passport")(passport); // Updated path

// Routes
app.use("/api/users", require("./routes/users"));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
