const express = require('express');
 const router = express.Router();
 const Mentor = require('../../models/mentor.js');
 const jwtCheck = require("../middleware/authjwt.js");
 const Student = require('../../models/student.js');
 
 // 1] GET all mentors
 router.get('/', async (req, res) => {
   try {
    console.log('generic route' ) ;
    const mentor = await Mentor.find();
    
     res.json(mentor);
   } catch (err) {
     res.status(500).json({ message: err.message });
   }
 });
// 2] 
 router.get('/mentor/:auth0Id',async (req,res)=>{
  try{
    const mentor=await Mentor.findOne({ auth0Id: req.params.auth0Id });
    res.json(mentor);
  }catch (err) {
    res.status(500).json({ message: err.message });
  }
}); 
// 3] 
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
console.log(mentorsWithRequestStatus) ;
// Now `mentorsWithRequestStatus` contains mentors with the `requested` field
res.json(mentorsWithRequestStatus);
  });


// 4] send badge req POST /api/mentors/request-verification
router.post('/request-verification/:auth0Id', async (req, res) => {
  try {
    const { auth0Id } = req.params;
    console.log("auth0Id received:", auth0Id);

    const mentor = await Mentor.findOne({ auth0Id });
    if (!mentor) return res.status(404).json({ message: 'Mentor not found' });
console.log('no  mentorrrr');

    if (mentor.badgeRequest?.requested && mentor.badgeRequest.status === 'pending') {
      return res.status(400).json({ message: 'Already requested. Please wait for admin response.' });
    }
console.log('abi nhi howa hai send');

    mentor.badgeRequest = {
      requested: true,
      status: 'pending',
      requestedAt: new Date()
    };
console.log('ho gya hai send');
    await mentor.save();

    res.status(200).json({ message: 'Verification request sent successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
