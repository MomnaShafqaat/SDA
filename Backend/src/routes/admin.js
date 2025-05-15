// routes/admin.js
const express = require("express");
const jwt = require("jsonwebtoken");
const Mentor = require("../../models/mentor.js");
const Student = require("../../models/student.js");
const User = require("../../models/User.js"); // path to your User model
const router = express.Router();
require("dotenv").config();

// Hardcoded admin credentials
const ADMIN_EMAIL = "momnashafqaat@gmail.com";
const ADMIN_PASSWORD = "supersecret";
const JWT_SECRET = process.env.JWT_SECRET;

// Login route for admin
router.post("/loginAdmin", (req, res) => {
    const { email, password } = req.body;
  console.log("1");
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        console.log("2");

      const token = jwt.sign({}, JWT_SECRET, { expiresIn: "1h" });
      console.log("3");

      return res.json({ token });

    }
  
    res.status(401).json({ message: "Invalid credentials" });
  });

// Protected admin route (no role checking)
router.get("/protected", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Get token from header
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.json({ message: "Welcome, Admin!" });  // No role check anymore
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
});

//count user
router.get('/counts', async (req, res) => {
    try {
        console.log("Admin counts route hit");

        const mentorsCount = await User.countDocuments({ role: 'mentor' });
        const studentsCount = await User.countDocuments({ role: 'student' });

        res.json({ mentors: mentorsCount, students: studentsCount });
    } catch (error) {
        console.error("Error getting counts:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
