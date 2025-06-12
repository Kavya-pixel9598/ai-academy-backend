const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  lessonId: { type: String, required: true, unique: true }, // unique slug like "ai-ml-dl"
  title: { type: String, required: true },
  description: String,
  storytelling: String,           // HTML or Markdown string
  videoUrl: String,               // YouTube embed URL
  liveCode: {
    language: String,
    starterCode: String,
  },
  miniProject: {
    title: String,
    description: String,
    starterCode: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);
