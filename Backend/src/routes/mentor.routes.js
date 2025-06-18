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

//POST (update or create) mentor profile
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

 // badhe to adminnpm start
router.post('/request-verification/:auth0Id', async (req, res) => {
  try {
    const { auth0Id } = req.params;
    console.log("auth0Id received:", auth0Id);

    const mentor = await Mentor.findOne({ auth0Id });
    if (!mentor) return res.status(404).json({ message: 'Mentor not found' });

    if (mentor.badgeRequest?.requested && mentor.badgeRequest.status === 'pending') {
      return res.status(400).json({ message: 'Already requested. Please wait for admin response.' });
    }

    mentor.badgeRequest = {
      requested: true,
      status: 'pending',
      requestedAt: new Date()
    };

    await mentor.save();

    res.status(200).json({ message: 'Verification request sent successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


//badge status 
router.get('/badge-status/:mentorId', authJwt, async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.mentorId);
    if (!mentor) return res.status(404).json({ error: 'Mentor not found' });

    // Assuming mentor.badgeStatus or similar field exists
    res.json({ badgeStatus: mentor.badgeStatus || null });
  } catch (error) {
    console.error('Error fetching badge status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// GET /api/mentors/by-auth0/:auth0Id
router.get('/by-auth0/:auth0Id', authJwt, async (req, res) => {
  try {
    const mentor = await Mentor.findOne({ auth0Id: req.params.auth0Id });
    if (!mentor) return res.status(404).json({ error: 'Mentor not found' });

    res.json(mentor);
  } catch (error) {
    console.error('Error fetching mentor by Auth0 ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
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

// GET all reviews for a mentor
router.get('/:mentorId/reviews', async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.mentorId).populate('reviews.reviewer', 'name');
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    res.json({
      reviews: mentor.reviews || [],
      ratingSummary: mentor.ratingSummary || { average: 0, count: 0 }
    });

  } catch (err) {
    console.error('GET reviews error:', err);
    res.status(500).json({ message: err.message });
  }
});



router.post('/:mentorId/reviews', async (req, res) => {
  try {
    const { rating, reviewText, reviewerId } = req.body;

    if (!reviewerId) {
      return res.status(400).json({ message: "Missing reviewerId in request body" });
    }

    // Step 1: Find the student using the auth0Id
    const student = await Student.findOne({ auth0Id: reviewerId });
    if (!student) {
      return res.status(404).json({ message: "Reviewer (student) not found" });
    }

    const reviewerObjectId = student._id;

    // Step 2: Find mentor
    const mentor = await Mentor.findById(req.params.mentorId);
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }

   // console.log('Mentor menteeList:', mentor.menteeList);
    //console.log('Reviewer ObjectId:', reviewerObjectId);

    // Step 3: Verify reviewer is in menteeList
    const isMentee = mentor.menteeList.some(
      (menteeId) => menteeId.toString() === reviewerObjectId.toString()
    );
    if (!isMentee) {
      return res.status(403).json({ message: "You are not authorized to review this mentor." });
    }

    // Step 4: Check if already reviewed
    const alreadyReviewed = mentor.reviews.some(
    (r) => r.reviewer && r.reviewer.toString() === reviewerId
    );
    if (alreadyReviewed) {
      return res.status(400).json({ message: 'You have already reviewed this mentor' });
    }

    // Step 5: Add review
    mentor.reviews.push({ review: reviewText, reviewer: reviewerObjectId });

    // Step 6: Add/update rating
    const existingRatingIndex = mentor.ratings.findIndex(
     (r) => r.rater && r.rater.toString() === reviewerId
    );

    if (existingRatingIndex >= 0) {
      mentor.ratings[existingRatingIndex].rating = rating;
      mentor.ratings[existingRatingIndex].createdAt = new Date();
    } else {
      mentor.ratings.push({ rating, rater: reviewerObjectId });
    }
    mentor.reviews = mentor.reviews.filter(r => r.reviewer);

    // Step 7: Update rating summary
    mentor.ratingSummary.count = mentor.ratings.length;
    mentor.ratingSummary.average =
      mentor.ratings.reduce((sum, r) => sum + r.rating, 0) / mentor.ratingSummary.count;

    await mentor.save();

    res.status(201).json(mentor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




//for admin to access
// GET /api/mentors/:mentorId
router.get('/profile/:id?', async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    let userData;
    let mentor;

    try {
      // Try Auth0 validation first
      const decodedAuth0 = await axios.get(`https://YOUR_DOMAIN/userinfo`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const auth0Id = decodedAuth0.data.sub;
      mentor = await Mentor.findOne({ auth0Id });
    } catch (err) {
      // If Auth0 fails, try internal JWT
      const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);
      const adminEmail = decodedJWT.email;

      if (adminEmail !== process.env.ADMIN_EMAIL) {
        return res.status(403).json({ message: 'Invalid admin token' });
      }

      const mentorId = req.params.id;
      if (!mentorId) return res.status(400).json({ message: 'Mentor ID required for admin' });

      mentor = await Mentor.findById(mentorId);
    }

    if (!mentor) return res.status(404).json({ message: 'Mentor not found' });

    return res.status(200).json(mentor);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({ message: 'Server error' });
  }
});


//show warning notification to mentor
router.get('/notifications', jwtCheck, async (req, res) => {
  try {
    const mentor = await Mentor.findOne({ auth0Id: req.auth.payload.sub });

    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }

    res.status(200).json({ notifications: mentor.notifications });
  } catch (err) {
    console.error("Fetch Notifications Error:", err);
    res.status(500).json({ error: "Failed to fetch notifications." });
  }
});


//badge
const updateBadge = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) return res.status(404).json({ message: "Mentor not found" });

    mentor.badge = true;  // Set the badge to true
    await mentor.save();

    res.json(mentor);  // Return updated mentor data
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

router.get('/top-mentors', async (req, res) => {
  try {
    const mentors = await Mentor.find({hasBadge: true})
    .sort({ 'ratingSummary.average': -1 });

    if (!mentors || mentors.length === 0) {
      return res.status(404).json({ error: 'No top mentors found' });
    }

    res.json(mentors);
  } catch (error) {
    console.error('Error fetching mentors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;
