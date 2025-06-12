const express = require('express');
const router = express.Router();
const {
  getAllQuizzes,
  getQuizById,
  submitQuiz
} = require('../controllers/quizController');

const Quiz = require('../models/Quiz'); // Needed for /seed

// ✅ Public quiz routes
router.get('/', getAllQuizzes);         // Get all quizzes
router.get('/:id', getQuizById);        // Get quiz by ID
router.post('/submit', submitQuiz);     // Submit quiz

// ✅ TEMP: Seed one quiz for testing
router.get('/seed', async (req, res) => {
  const sampleQuiz = {
    title: 'AI Fundamentals Quiz',
    questions: [
      {
        questionText: 'What is Machine Learning?',
        options: [
          { optionText: 'A type of washing machine', isCorrect: false },
          { optionText: 'A type of AI that learns from data', isCorrect: true },
          { optionText: 'A method to clean data', isCorrect: false },
          { optionText: 'A programming language', isCorrect: false },
        ]
      },
      {
        questionText: 'Which algorithm is used for classification?',
        options: [
          { optionText: 'Linear Regression', isCorrect: false },
          { optionText: 'Logistic Regression', isCorrect: true },
          { optionText: 'K-Means Clustering', isCorrect: false },
          { optionText: 'PCA', isCorrect: false },
        ]
      }
    ]
  };

  try {
    await Quiz.create(sampleQuiz);
    res.status(201).json({ message: '✅ Quiz seeded successfully!' });
  } catch (err) {
    res.status(500).json({ message: '❌ Quiz seeding failed', error: err.message });
  }
});

module.exports = router;
