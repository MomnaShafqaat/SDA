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

  router.get('/fetchMentors', jwtCheck, async(req,res)=>{
    console.log("Fetching mentors..." , req.user.id) ;
   // Assume this is the logged-in student
const student = await Student.findById(req.user.id); // studentId should be available
const pendingRequests = student.pendingRequests.map(id => id.toString());

// Get all mentors
const mentors = await Mentor.find({});

// Add 'requested' field to each mentor
const mentorsWithRequestStatus = mentors.map(mentor => {
  const isRequested = pendingRequests.includes(mentor._id.toString());
  return {
    ...mentor.toObject(), // convert Mongoose document to plain JS object
    requested: isRequested,
  };
});

// Now `mentorsWithRequestStatus` contains mentors with the `requested` field
res.json(mentorsWithRequestStatus);
  });

 
 module.exports = router;