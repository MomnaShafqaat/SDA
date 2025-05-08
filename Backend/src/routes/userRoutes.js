const express = require("express");
const User = require("../../models/User");
const MentorProfile = require("../../models/MentorProfile");
const StudentProfile = require("../../models/StudentProfile");

const router = express.Router();

// 🔹 Register User
router.post("/register", async (req, res) => {
    try {
        console.log("Incoming Request:", req.body);

        const { auth0Id, email, name, role } = req.body;

        // 🔹 Check for missing fields
        if (!auth0Id || !email || !name || !role) {
            console.log(" Missing required fields:", { auth0Id, email, name, role });
            return res.status(400).json({ error: "All fields are required" });
        }

        let user = await User.findOne({ auth0Id });

        if (!user) {
            console.log("🆕 Creating new user...");
            user = await User.create({ auth0Id, email, name, role });
            console.log("User created:", user);

            if (role === "mentor") {
                console.log(" Creating Mentor Profile...");
                await MentorProfile.create({ userId: user._id });
            } else {
                console.log(" Creating Student Profile...");
                await StudentProfile.create({ userId: user._id });
            }
        } else {
            console.log("User already exists:", user);
        }

        res.status(201).json({ message: "User registered successfully", user });

    } catch (error) {
        console.error(" Backend Error:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
});


// 🔹 Get User Profile
router.get("/profile/:auth0Id", async (req, res) => {
    try {
        const user = await User.findOne({ auth0Id: req.params.auth0Id });

        if (!user) return res.status(404).json({ error: "User not found" });

        let profile = user.role === "mentor"
            ? await MentorProfile.findOne({ userId: user._id })
            : await StudentProfile.findOne({ userId: user._id });

        res.status(200).json({ user, profile });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 🔹 Update User Profile
router.put("/update-profile/:auth0Id", async (req, res) => {
    try {
        const user = await User.findOne({ auth0Id: req.params.auth0Id });
        if (!user) return res.status(404).json({ error: "User not found" });

        const updatedProfile = user.role === "mentor"
            ? await MentorProfile.findOneAndUpdate({ userId: user._id }, req.body, { new: true })
            : await StudentProfile.findOneAndUpdate({ userId: user._id }, req.body, { new: true });

        res.status(200).json({ message: "Profile updated", updatedProfile });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 🔹 Delete User
router.delete("/delete/:auth0Id", async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ auth0Id: req.params.auth0Id });

        if (!user) return res.status(404).json({ error: "User not found" });

        if (user.role === "mentor") {
            await MentorProfile.findOneAndDelete({ userId: user._id });
        } else {
            await StudentProfile.findOneAndDelete({ userId: user._id });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});




module.exports = router;
