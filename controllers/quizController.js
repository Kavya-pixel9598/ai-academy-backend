const Quiz = require('../models/Quiz');

// ✅ Get all quizzes (Public)
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({});
    if (!quizzes || quizzes.length === 0) {
      return res.status(404).json({ message: 'No quizzes available' });
    }
    res.status(200).json(quizzes);
  } catch (error) {
    console.error('❌ Failed to fetch quizzes:', error);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
};

// ✅ Get a single quiz by ID (Public)
exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (error) {
    console.error('❌ Failed to fetch quiz:', error);
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
};

// ✅ Submit quiz and calculate score (Public)
exports.submitQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    let correctCount = 0;

    quiz.questions.forEach(question => {
      const userAnswer = answers.find(a => a.questionId === question._id.toString());
      if (!userAnswer) return;

      const selectedOption = question.options.find(
        opt => opt._id.toString() === userAnswer.selectedOptionId
      );

      if (selectedOption && selectedOption.isCorrect) {
        correctCount += 1;
      }
    });

    const total = quiz.questions.length;
    const percentage = ((correctCount / total) * 100).toFixed(2);
    const passed = percentage >= 70;

    res.status(200).json({
      quizTitle: quiz.title,
      totalQuestions: total,
      correctAnswers: correctCount,
      percentage,
      passed
    });
  } catch (error) {
    console.error('❌ Failed to submit quiz:', error);
    res.status(500).json({ error: 'Failed to submit quiz' });
  }
};
