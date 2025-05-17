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

router.get('/fetchMentors', jwtCheck, async(req,res)=>{
    console.log("Fetching mentors..." , req.user.id) ;
   // Assume this is the logged-in student
const student = await Student.findById(req.user.id); // studentId should be available
//const pendingRequests = student.pendingRequests.map(id => id.toString());

// Get all mentors
const mentors = await Mentor.find({});

// Add 'requested' field to each mentor
// const mentorsWithRequestStatus = mentors.map(mentor => {
//   const isRequested = pendingRequests.includes(mentor._id.toString());
//   return {
//     ...mentor.toObject(), // convert Mongoose document to plain JS object
//     requested: isRequested,
//   };
// });
console.log(mentorsWithRequestStatus) ;
// Now mentorsWithRequestStatus contains mentors with the requested field
res.json(mentorsWithRequestStatus);
});


router.post("/profile",jwtCheck, async (req, res) => {
  try {
    
    console.log("Request body:", req.body);
    const {
    bio,
    expertise,
    experience,
    availableSlots,
    skills,
    qualification
  } = req.body;

 
    const updatedMentor = await Mentor.findByIdAndUpdate(
      req.user.id,
      {
        bio,
        expertise,
        experience,
        availableSlots,
        skills,
        qualification
      },
      
    );


    res.status(201).json({ message: "Mentor profile created", updatedMentor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});



router.get('/profile',jwtCheck, async (req, res) => {
  console.log("Fetching mentor profile...");
  const auth0Id = req.user?.sub; // or however you extract user ID
  const profile = await Mentor.findById(req.user.id);
  if (!profile) return res.status(404).json({ error: "Profile not found" });
  res.json(profile);
});

router.delete('/profile', jwtCheck, async (req, res) => {
  try {
    
    const auth0Id = req.user.sub; 

    // Find and delete mentor profile by auth0Id
    const deleted = await Mentor.findOneAndDelete({ auth0Id });

    if (!deleted) {
      return res.status(404).json({ message: 'Mentor profile not found' });
    }

    res.json({ message: 'Mentor profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting mentor profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

 module.exports = router;