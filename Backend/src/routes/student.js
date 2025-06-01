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
    const student = await Student.findById(studentID).populate('mentorList');

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Map through mentorList and add isPayed field
    const mentorsWithPayedStatus = student.mentorList.map(mentor => {
      const isPayed = student.payedMentors.includes(mentor._id.toString());
      return {
        ...mentor.toObject(), // convert Mongoose document to plain JS object
        isPayed
      };
    });

    res.status(200).json({ mentors: mentorsWithPayedStatus });
  } catch (err) {
    console.error("Error fetching mentors list:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.get('/:studentId', async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json(student);
  } catch (err) {
    console.error("Error fetching student:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post('/profile', jwtCheck, async (req, res) => {
  try {
    const auth0Id = req.auth.payload.sub;

    // Find studnet
    let student = await Student.findOne({ auth0Id });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Update fields
    const { name, qualification } = req.body;

    if (name !== undefined) student.name = name;
    if (qualification !== undefined) student.education = qualification;

    await student.save();

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Server error while updating profile" });
  }
});


module.exports=router;