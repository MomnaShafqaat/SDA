const express = require('express');
const router = express.Router();
const { getAIResponse } = require('../services/huggingface');

router.post('/chat', async (req, res) => {
  try {
    const reply = await getAIResponse(req.body.message);
    res.json({ reply });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;