const express = require('express');
 const router = express.Router();
 const Mentor = require('../../models/User.js');
 
 // GET all mentors
 router.get('/', async (req, res) => {
   try {
    const mentor = await User.findfind().populate();
    console.log(mentor.expertise);
    
     res.json(mentor);
   } catch (err) {
     res.status(500).json({ message: err.message });
   }
 });
 
 module.exports = router;