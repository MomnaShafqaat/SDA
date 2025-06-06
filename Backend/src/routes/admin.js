// routes/admin.js
const express = require("express");
const jwt = require("jsonwebtoken");
const Mentor = require("../../models/mentor.js");
const Student = require("../../models/student.js");
const User = require("../../models/User.js"); // path to your User model
const router = express.Router();
const verifyToken = require('../middleware/verifyToken.js');
const verifyAdmin = require('../middleware/verifyAdmin');

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
         const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
             // const token = jwt.sign({}, JWT_SECRET, { expiresIn: "1h" });
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

 //badge request from mento shown on admin dashboard
router.get('/badge-requests', async (req, res) => {
  try {
    const mentorsWithRequests = await Mentor.find({ 
      "badgeRequest.requested": true, 
      "badgeRequest.status": "pending" 
    });

    res.status(200).json(mentorsWithRequests);
  } catch (err) {
    console.error("Error fetching badge requests:", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.post('/verify-badge/:mentorId', async (req, res) => {
  const { mentorId } = req.params;
  const { decision } = req.body;

  try {
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) return res.status(404).json({ message: "Mentor not found" });

    if (decision === 'accept') {
      mentor.badgeRequest.status = 'accepted';
      console.log("admin accept it");
      mentor.hasBadge = true;
       console.log("status updated to true for badge");

    } else if (decision === 'reject') {
      mentor.badgeRequest.status = 'rejected';

            console.log("admin reject it");

        mentor.hasBadge = false;
    }

    await mentor.save();
    res.status(200).json({ message: `Request ${decision}ed successfully.` });
  } catch (err) {
    console.error("Error updating badge request:", err);
    res.status(500).json({ message: "Server error" });
  }
});



//takes the mentor id for admin 
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) return res.status(404).json({ message: 'Mentor not found' });
    res.json(mentor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



/* verify admin

router.get('/mentor-profile/:id', verifyToken, verifyAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const mentor = await Mentor.findById(id);
    if (!mentor) return res.status(404).json({ message: "Mentor not found" });

    res.status(200).json(mentor);
  } catch (error) {
    console.error("Error fetching mentor profile by admin:", error);
    res.status(500).json({ message: "Server error" });
  }
});

GET /api/admin/mentor-profile/MENTOR_ID
Authorization: Bearer YOUR_ADMIN_JWT



*/
router.get('/mentor-profile/:id', verifyAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const mentor = await Mentor.findById(id);
    if (!mentor) return res.status(404).json({ message: "Mentor not found" });

    res.status(200).json(mentor);
  } catch (error) {
    console.error("Error fetching mentor profile by admin:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
