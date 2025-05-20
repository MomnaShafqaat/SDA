const express = require('express');
const router = express.Router();
const Mentor = require('../../models/mentor.js');
const authJwt = require("../middleware/authjwt.js");
const Student = require('../../models/student.js');
const jwtCheck = require("../middleware/authMiddleware.js");

// GET all mentors
router.get('/', async (req, res) => {
  try {
  console.log('generic route' ) ;
  const mentor = await Mentor.find();
  console.log("Mentors fetched:", mentor);
  console.log(mentor) ;
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

  router.get('/fetchMentors', authJwt, async(req,res)=>{
    console.log("Fetching mentors..." , req.user.id) ;
   // Assume this is the logged-in student
const student = await Student.findById(req.user.id);
console.log(student); // studentId should be available
const pendingRequests = student.pendingRequests.map(id => id.toString());
const mentors = await Mentor.find();
    const mentorsWithRequestStatus = mentors.map(mentor => {
      const isRequested = pendingRequests.includes(mentor._id.toString());
      return {
        ...mentor.toObject(),
        requested: isRequested, //could be useful to disable request button in frontend ig
      };
    });
    console.log('fetch mentors : ' , mentorsWithRequestStatus) ;

    res.json(mentorsWithRequestStatus);

  });


// GET /api/mentors/mentorRequests
router.get('/mentorRequests', authJwt, async (req, res) => {
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
router.post('/updateRequestStatus/:studentId', authJwt, async (req, res) => {
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
        await mentor.pendingRequests.pull(studentId);
        await student.pendingRequests.pull(mentorId);
        
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


router.get('/profile', jwtCheck, async (req, res) => {
  try {
    const mentor = await Mentor.findOne({ auth0Id: req.auth.payload.sub });
    res.json(mentor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/profile', jwtCheck, async (req, res) => {
  try {
    const mentor = await Mentor.findOneAndUpdate(
      { auth0Id: req.auth.payload.sub },
      req.body,
      { new: true, upsert: true }
    );
    res.json(mentor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
