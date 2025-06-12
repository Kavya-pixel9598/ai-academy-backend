const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  optionText: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
});

const quizQuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [optionSchema],
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [quizQuestionSchema],
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
