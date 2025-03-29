const express = require('express');
 const router = express.Router();
 const Mentor = require('../../models/mentor.js');
 
 // GET all mentors
 router.get('/', async (req, res) => {
   try {
    const mentor = await Mentor.find();
    
     res.json(mentor);
   } catch (err) {
     res.status(500).json({ message: err.message });
   }
 });
 
 module.exports = router;