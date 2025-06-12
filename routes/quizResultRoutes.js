const express = require('express');
const router = express.Router();
const quizResultController = require('../controllers/quizResultController');
const { verifyToken } = require('../middleware/authMiddleware');

// Save or update quiz result (user submits quiz)
router.post('/', verifyToken, quizResultController.saveQuizResult);

// Check if quiz completed for user and lesson
router.get('/status/:userId/:lessonId', verifyToken, quizResultController.checkQuizCompletion);

module.exports = router;
