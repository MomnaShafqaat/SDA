const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();

// Hardcoded admin credentials
const ADMIN_EMAIL = "momnashafqaat@gmail.com";
const ADMIN_PASSWORD = "supersecret";
const JWT_SECRET = process.env.JWT_SECRET;

// Login route
router.post("/loginAdmin", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "1h" });
    return res.json({ token });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

//  Protected admin route
router.get("/protected", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role === "admin") {
      return res.json({ message: "Welcome, Admin!" });
    }
    res.status(403).json({ message: "Forbidden" });
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;
