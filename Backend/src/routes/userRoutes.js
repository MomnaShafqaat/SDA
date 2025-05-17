const express = require("express");
const User = require("../../models/User.js");
const Mentor = require("../../models/mentor.js");
const Student = require("../../models/student.js");
const jwtCheck = require("../middleware/authMiddleware.js");
const jwt = require("jsonwebtoken");
const config = require("config");

const router = express.Router();
router.get('/me',jwtCheck, async (req, res) => {
    try {
        const auth0Id = req.auth.payload.sub;
        const user = await User.findOne({ auth0Id });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// 🔹 Register User
router.post("/register", async (req, res) => {
    try {
        console.log("Incoming Request:", req.body);
        const { auth0Id, email, name, role, picture } = req.body;

        // 🔹 Check for missing fields
        if (!auth0Id /* || !email || !name || !role || !picture */) {
            return res.status(400).json({ error: "All fields are required" });
        }

        let user = await User.findOne({ auth0Id });

        if (!user) {
            console.log("Creating new user...");
            user = role === "mentor" ? new Mentor(req.body) : new Student(req.body);
            await user.save();
            console.log("User created:", user);
        } else {
            console.log("User already exists:", user);
        }
        console.log("user role : " + user.role) ;
        let token = jwt.sign({ id: user._id  , name: user.name , role: user.role }, config.get("jwtPrivateKey") ) ;
        console.log("Generated Token:", token);
        res.send(token) ;
    } catch (error) {
        console.error("Backend Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
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
