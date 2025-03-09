const express = require('express');
const router = express.Router();
const Mentor = require('../models/mentor.model');

// GET all mentors
router.get('/', async (req, res) => {
  try {
    const mentors = await Mentor.find().populate('menteeList pendingRequests reviews.reviewer');
    res.json(mentors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;