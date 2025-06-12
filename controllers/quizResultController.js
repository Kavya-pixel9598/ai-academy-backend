const QuizResult = require('../models/QuizResult');

// Save quiz result
exports.saveQuizResult = async (req, res) => {
  try {
    const { userId, lessonId, score } = req.body;

    if (!userId || !lessonId || score === undefined) {
      return res.status(400).json({ message: 'userId, lessonId, and score are required' });
    }

    // Upsert: update existing or create new
    const result = await QuizResult.findOneAndUpdate(
      { userId, lessonId },
      { score, completedAt: new Date() },
      { upsert: true, new: true }
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Check if user completed quiz for lesson
exports.checkQuizCompletion = async (req, res) => {
  try {
    const { userId, lessonId } = req.params;
    const result = await QuizResult.findOne({ userId, lessonId });
    res.status(200).json({ completed: !!result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
