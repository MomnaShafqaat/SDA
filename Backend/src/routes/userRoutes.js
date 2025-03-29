const express = require("express");
const User = require("../../models/User.js");
const Mentor = require("../../models/mentor.js");
const Student = require("../../models/student.js");

const router = express.Router();

// 🔹 Register User
router.post("/register", async (req, res) => {
    try {
        console.log("Incoming Request:", req.body);
        const { auth0Id, email, name, role, picture } = req.body;

        // 🔹 Check for missing fields
        if (!auth0Id || !email || !name || !role || !picture) {
            return res.status(400).json({ error: "All fields are required" });
        }

        let user = await User.findOne({ auth0Id });

        if (!user) {
            console.log("🆕 Creating new user...");
            user = role === "mentor" ? new Mentor(req.body) : new Student(req.body);
            await user.save();
            console.log("User created:", user);
        } else {
            console.log("User already exists:", user);
        }

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error("Backend Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 🔹 Get User Profile
router.get("/profile/:auth0Id", async (req, res) => {
    try {
        const user = await User.findOne({ auth0Id: req.params.auth0Id });
        if (!user) return res.status(404).json({ error: "User not found" });

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 🔹 Update User Profile
router.put("/update-profile/:auth0Id", async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { auth0Id: req.params.auth0Id },
            req.body,
            { new: true }
        );

        if (!user) return res.status(404).json({ error: "User not found" });

        res.status(200).json({ message: "Profile updated", user });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 🔹 Delete User
router.delete("/delete/:auth0Id", async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ auth0Id: req.params.auth0Id });
        if (!user) return res.status(404).json({ error: "User not found" });

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
