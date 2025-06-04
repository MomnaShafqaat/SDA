const express = require('express');
const router = express.Router();
const User = require('../../models/User.js');
const jwt = require('../middleware/authjwt.js'); // assuming it adds req.user
const Report = require('../../models/report.js');
const Mentor = require('../../models/mentor.js'); // or correct path
// 🟢 Route to report a user
router.post('/reportUser', jwt, async (req, res) => {
  try {
    const reporterId = req.user.id;
    const { reportedId, reportType, description } = req.body;

    const newReport = new Report({
      reporter: reporterId,
      reported: reportedId,
      reportType,
      description
    });

    await newReport.save();
    res.status(201).json({ message: 'Report submitted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit report.' });
  }
});

// 🟢 Route for admin to view all reports
router.get('/reports', async (req, res) => {
  try {
const reports = await Report.find()
     .populate({ path: 'reporter', model: 'User', select: 'name email' })
  .populate({ path: 'reported', model: 'User', select: 'name email' });

    res.json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

//send the warning
//for admin
// 📁 backend: /warn/:userId

router.post('/warn/:userId', async (req, res) => {
  const { userId } = req.params;
  const { message } = req.body;
  const userToWarn = await User.findById(userId);
  try {
    const userToWarn = await User.findById(userId);
    if (!userToWarn) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add a warning notification
    userToWarn.notifications.push({
      message,
      type: 'warning',
      read: false,
      createdAt: new Date()
    });

    await userToWarn.save();

    res.status(200).json({ message: "Warning sent successfully" });
  } catch (err) {
    console.error("Warning error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


//for mentor for warning
// Fetch notifications for a specific user (mentor)
router.get('/notifications', jwt,  async (req, res) => {
  

  try {
    const user = await User.findById(req.user.id); // ✅ correct lookup
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ notifications: user.notifications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});




module.exports = router;
