
const express = require('express');
const router = express.Router();
const multer = require('multer');
const pdf = require('pdf-parse');
const { analyzeCV } = require('../services/analyzeCV.js');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('cv'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Extract text from PDF
    const data = await pdf(req.file.buffer);
    let cvText = data.text.replace(/\s+/g, ' ').trim();
    cvText = cvText.substring(0, 10000); // Limit text length

    // Get AI analysis
    const analysis = await analyzeCV(cvText);
    res.json(analysis);
    
  } catch (error) {
    console.error('CV Analysis Route Error:', error);
    res.status(500).json({ error: error.message || "Analysis failed. Please try again with a different CV." });
  }
});

module.exports = router;