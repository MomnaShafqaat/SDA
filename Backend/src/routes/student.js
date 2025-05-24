const express=require('express');
const router=express.Router();
const Student = require("../../models/student.js");
const authjwt = require('../middleware/authjwt.js');
const Mentor = require("../../models/mentor.js");
const jwtCheck=require("../middleware/authMiddleware.js")

router.post('/sendRequest/:mentorId', authjwt, async(req ,res)=>{

    const studentId = req.user.id;         
    const mentorId = req.params.mentorId;

    try {
        // Fetch mentor and student from DB
        const mentor = await Mentor.findById(mentorId);
        const student = await Student.findById(studentId);
    
        if (!mentor || !student) {
          return res.status(404).json({ error: 'Mentor or Student not found' });
        }
    
        // Avoid duplicate requests
        if (mentor.pendingRequests.includes(studentId)) {
          return res.status(400).json({ error: 'Request already sent' });
        }
    
        // Update both documents
        mentor.pendingRequests.push(studentId);
        student.pendingRequests.push(mentorId);
    
        // Save both documents
        await mentor.save();
        await student.save();
    
        res.status(200).json({ message: "Request sent successfully" });
      } catch (err) {
        console.error("Send Request Error:", err);
        res.status(500).json({ error: "Internal server error" });
      }
})
router.get('/profile', jwtCheck, async (req, res) => {
  try {
    const student = await Student.findOne({ auth0Id: req.auth.payload.sub });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /:studentID/mentors (Get student's mentors)
router.get('/:studentID/mentors', authjwt, async (req, res) => {
  const { studentID } = req.params;

  if (!studentID || studentID === "null") {
    return res.status(400).json({ error: "Invalid student ID" });
  }

  try {
    const student = await Student.findById(studentID).populate('mentorList', 'name email bio picture');
    console.log(student);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({ mentors: student.mentorList });
  } catch (err) {
    console.error("Error fetching mentors list:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports=router;