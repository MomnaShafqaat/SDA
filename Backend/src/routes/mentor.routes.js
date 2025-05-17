const express = require('express');
const router = express.Router();
const Mentor = require('../../models/mentor.js');
const jwtCheck = require("../middleware/authjwt.js");
const Student = require('../../models/student.js');

// GET all mentors
router.get('/', async (req, res) => {
  try {
  console.log('generic route' ) ;
  const mentor = await Mentor.find();
  console.log("Mentors fetched:", mentor);
  
    res.json(mentor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/mentor/:auth0Id',async (req,res)=>{
  try{
    const mentor=await Mentor.findOne({ auth0Id: req.params.auth0Id });
    res.json(mentor);
  }catch (err) {
    res.status(500).json({ message: err.message });
  }
}); 

router.get('/fetchMentors', jwtCheck, async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // excluded accepted mentors(mentorList)
    const excludeIds = student.mentorList;

    // Get all mentors(after excluding aboveee)
    const mentors = await Mentor.find({ _id: { $nin: excludeIds } });

    // if request is pending
    const pendingRequests = student.pendingRequests.map(id => id.toString());

    const mentorsWithRequestStatus = mentors.map(mentor => {
      const isRequested = pendingRequests.includes(mentor._id.toString());
      return {
        ...mentor.toObject(),
        requested: isRequested, //could be useful to disable request button in frontend ig
      };
    });

    res.json(mentorsWithRequestStatus);

  } catch (err) {
    console.error("Fetch mentors error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET /api/mentors/mentorRequests
router.get('/mentorRequests', jwtCheck, async (req, res) => {
  const mentorId = req.user.id;
  console.log("mentorId from JWT:", mentorId); 

  try {
      const mentor = await Mentor.findById(mentorId).populate('pendingRequests', 'name email');
      if (!mentor) {
          return res.status(404).json({ error: 'Mentor not found' });
      }

      res.status(200).json({ pendingRequests: mentor.pendingRequests });
  } catch (error) {
      console.error('Error fetching mentor requests:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/mentors/updateRequestStatus/:studentId
router.post('/updateRequestStatus/:studentId', jwtCheck, async (req, res) => {
  const mentorId = req.user.id;
  const studentId = req.params.studentId;
  const { action } = req.body;

  try {
      const mentor = await Mentor.findById(mentorId);
      const student = await Student.findById(studentId);

      if (!mentor || !student) {
          return res.status(404).json({ error: 'Mentor or Student not found' });
      }

      // Remove student from pending
      mentor.pendingRequests = mentor.pendingRequests.filter(id => id.toString() !== studentId);
      student.pendingRequests = student.pendingRequests.filter(id => id.toString() !== mentorId);

    if (action === 'accept') {
      if (!mentor.menteeList.some(id => id.toString() === studentId)) {
        mentor.menteeList.push(studentId);
      }
      if (!student.mentorList.some(id => id.toString() === mentorId)) {
        student.mentorList.push(mentorId);
      }
    }

    await mentor.save();
    await student.save();

    res.status(200).json({ message: `Request ${action}ed successfully.` });
  } catch (err) {
      console.error(`Error while ${action}ing request:`, err);
      res.status(500).json({ error: `Failed to ${action} request.` });
  }
});

module.exports = router;
