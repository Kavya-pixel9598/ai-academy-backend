const express = require('express');
const axios = require('axios');
const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

router.post('/ask', async (req, res) => {
  console.log('Received body:', req.body); // ✅ Debug line

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const geminiResponse = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/chat-bison-001:generateMessage',
      {
        contents: [{ parts: [{ text: message }] }],
      },
      {
        headers: { 'Content-Type': 'application/json' },
        params: { key: GEMINI_API_KEY },
      }
    );

    const reply = geminiResponse.data.candidates?.[0]?.content?.parts?.[0]?.text;
    res.json({ response: reply || 'No response from Gemini' });
  } catch (error) {
    console.error('Gemini error:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch AI response' });
  }
});

module.exports = router;
