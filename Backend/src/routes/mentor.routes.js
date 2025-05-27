// const express = require('express');
//  const router = express.Router();
//  const Mentor = require('../../models/mentor.js');
//  const jwtCheck = require("../middleware/authjwt.js");
//  const Student = require('../../models/student.js');
 
//  // GET all mentors
//  router.get('/', async (req, res) => {
//    try {
//     console.log('generic route' ) ;
//     const mentor = await Mentor.find();
    
//      res.json(mentor);
//    } catch (err) {
//      res.status(500).json({ message: err.message });
//    }
//  });

//  router.get('/mentor/:auth0Id',async (req,res)=>{
//   try{
//     const mentor=await Mentor.findOne({ auth0Id: req.params.auth0Id });
// const router = express.Router();
// const Mentor = require('../../models/mentor.js');
// const authJwt = require("../middleware/authjwt.js");
// const Student = require('../../models/student.js');
// const jwtCheck = require("../middleware/authMiddleware.js");

// // GET all mentors
// router.get('/', async (req, res) => {
//   try {
//     console.log('generic route');
//     const mentor = await Mentor.find();
//     console.log("Mentors fetched:", mentor);
//     console.log(mentor); // ← added this line from second version
//     res.json(mentor);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.get('/fetchMentors', authJwt, async (req, res) => {
//   try {
//     const student = await Student.findById(req.user.id);

//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     const excludeIds = student.mentorList;
//     const mentors = await Mentor.find({ _id: { $nin: excludeIds } });

//     const pendingRequests = student.pendingRequests.map(id => id.toString());

//     const mentorsWithRequestStatus = mentors.map(mentor => {
//       const isRequested = pendingRequests.includes(mentor._id.toString());
//       return {
//         ...mentor.toObject(),
//         requested: isRequested,
//       };
//     });

//     console.log('fetch mentors : ', mentorsWithRequestStatus);

//     res.json(mentorsWithRequestStatus);

//   } catch (err) {
//     console.error("Fetch mentors error:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }); 

 
//  module.exports = router;
//   } catch (err) {
//     console.error("Fetch mentors error:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // GET /mentorRequests (Mentor fetching pending requests)
// router.get('/mentorRequests', authJwt, async (req, res) => {
//   const mentorId = req.user.id;
//   console.log("mentorId from JWT:", mentorId);

//   try {
//     const mentor = await Mentor.findById(mentorId).populate('pendingRequests', 'name email');
//     if (!mentor) {
//       return res.status(404).json({ error: 'Mentor not found' });
//     }

//     res.status(200).json({ pendingRequests: mentor.pendingRequests });
//   } catch (error) {
//     console.error('Error fetching mentor requests:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // POST /updateRequestStatus/:studentId (Mentor accepts/rejects request)
// router.post('/updateRequestStatus/:studentId', authJwt, async (req, res) => {
//   const mentorId = req.user.id;
//   const studentId = req.params.studentId;
//   const { action } = req.body;

//   try {
//     const mentor = await Mentor.findById(mentorId);
//     const student = await Student.findById(studentId);

//     if (!mentor || !student) {
//       return res.status(404).json({ error: 'Mentor or Student not found' });
//     }

//     // Cleaner version from second code
//     await mentor.pendingRequests.pull(studentId);
//     await student.pendingRequests.pull(mentorId);

//     if (action === 'accept') {
//       if (!mentor.menteeList.some(id => id.toString() === studentId)) {
//         mentor.menteeList.push(studentId);
//       }
//       if (!student.mentorList.some(id => id.toString() === mentorId)) {
//         student.mentorList.push(mentorId);
//       }
//     }

//     await mentor.save();
//     await student.save();

//     res.status(200).json({ message: `Request ${action}ed successfully.` });
//   } catch (err) {
//     console.error(`Error while ${action}ing request:`, err);
//     res.status(500).json({ error: `Failed to ${action} request.` });
//   }
// });


// router.get('/profile', jwtCheck, async (req, res) => {
//   try {
//     const mentor = await Mentor.findOne({ auth0Id: req.auth.payload.sub });
//     res.json(mentor);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.post('/profile', jwtCheck, async (req, res) => {
//   try {
//     const mentor = await Mentor.findOneAndUpdate(
//       { auth0Id: req.auth.payload.sub },
//       req.body,
//       { new: true, upsert: true }
//     );
//     res.json(mentor);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Mentor = require('../../models/mentor.js');
const authJwt = require("../middleware/authjwt.js");
const Student = require('../../models/student.js');
const jwtCheck = require("../middleware/authMiddleware.js");

// GET all mentors
router.get('/', async (req, res) => {
  try {
    console.log('GET /api/mentors - Fetching all mentors');
    const mentor = await Mentor.find();
    res.json(mentor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET mentor by auth0Id
router.get('/mentor/:auth0Id', async (req, res) => {
  try {
    const mentor = await Mentor.findOne({ auth0Id: req.params.auth0Id });
    res.json(mentor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /fetchMentors (Student fetching available mentors)
router.get('/fetchMentors', authJwt, async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const excludeIds = student.mentorList;
    const mentors = await Mentor.find({ _id: { $nin: excludeIds } });

    const pendingRequests = student.pendingRequests.map(id => id.toString());

    const mentorsWithRequestStatus = mentors.map(mentor => {
      const isRequested = pendingRequests.includes(mentor._id.toString());
      return {
        ...mentor.toObject(),
        requested: isRequested,
      };
    });

    res.json(mentorsWithRequestStatus);
  } catch (err) {
    console.error("Fetch mentors error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET /mentorRequests (Mentor fetching pending requests)
router.get('/mentorRequests', authJwt, async (req, res) => {
  const mentorId = req.user.id;

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

// POST /updateRequestStatus/:studentId (Mentor accepts/rejects request)
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

    // Remove student from pending lists
    mentor.pendingRequests.pull(studentId);
    student.pendingRequests.pull(mentorId);

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

// GET current mentor profile
router.get('/profile', jwtCheck, async (req, res) => {
  try {
    const mentor = await Mentor.findOne({ auth0Id: req.auth.payload.sub });
    res.json(mentor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST (update or create) mentor profile
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

// GET /:mentorId/mentees (Get mentor's mentees)
router.get('/:mentorId/mentees', authJwt, async (req, res) => {
  const { mentorId } = req.params;

  if (!mentorId || mentorId === "null") {
    return res.status(400).json({ error: "Invalid mentor ID" });
  }

  try {
    const mentor = await Mentor.findById(mentorId).populate('menteeList', 'name email picture');
    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }

    res.status(200).json({ mentees: mentor.menteeList });
  } catch (err) {
    console.error("Error fetching mentee list:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


//  send badge to admin
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


//badge status 
router.get('/badge-status/:mentorId', async (res,req) => {
try{
const mentor= await Mentor.findById(req.params.mentorId);
if(!mentor) return res.status(404).json({message:'Mentor not found'});
res.json({
      status: mentor.badgeRequest.status || 'pending'
    });
}
catch(error){
  console.error("error fetching badge status",error);
res.status(500).json({message:"server error"});

}

});

});
router.get('/filteredByExpertise', async (req, res) => {
  try {
    const { expertise, name } = req.query;
    const query = {};

    if (expertise) {
      query.expertise = expertise;
    }

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }


    const mentors = await Mentor.find(query);
    res.json(mentors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/:mentorId/reviews', async (req, res) => {
  try {
    const { review, reviewerId } = req.body;
    const mentor = await Mentor.findById(req.params.mentorId);

    mentor.reviews.push({ review, reviewer: reviewerId });
    await mentor.save();

    res.status(201).json(mentor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all reviews for a mentor
router.get('/:mentorId/reviews', async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.mentorId).populate('reviews.reviewer', 'name');
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    res.json(mentor.reviews);
    
  } catch (err) {
    console.error('GET reviews error:', err);
    res.status(500).json({ message: err.message });
  }
});


router.post('/:mentorId/ratings', async (req, res) => {
  try {
    const { rating, raterId } = req.body;
    const mentor = await Mentor.findById(req.params.mentorId);

    // Add new rating or update existing rating from same user
    const existingRatingIndex = mentor.ratings.findIndex(r => r.rater.toString() === raterId);

    if (existingRatingIndex >= 0) {
      mentor.ratings[existingRatingIndex].rating = rating;
      mentor.ratings[existingRatingIndex].createdAt = new Date();
    } else {
      mentor.ratings.push({ rating, rater: raterId });
    }

    // Calculate summary
    mentor.ratingSummary.count = mentor.ratings.length;
    mentor.ratingSummary.average =
      mentor.ratings.reduce((sum, r) => sum + r.rating, 0) / mentor.ratingSummary.count;

    await mentor.save();

    res.status(201).json(mentor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
