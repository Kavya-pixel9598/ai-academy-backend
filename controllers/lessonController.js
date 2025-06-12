const Lesson = require('../models/Lesson');

exports.createLesson = async (req, res) => {
  try {
    const { lessonId, title, description, storytelling, videoUrl, liveCode, miniProject } = req.body;
    const lesson = await Lesson.create({
      lessonId,
      title,
      description,
      storytelling,
      videoUrl,
      liveCode,
      miniProject,
    });
    res.status(201).json(lesson);
  } catch (error) {
    console.error('Create lesson error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.status(200).json(lessons);
  } catch (error) {
    console.error('Get lessons error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
    res.status(200).json(lesson);
  } catch (error) {
    console.error('Get lesson by ID error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getLessonBySlug = async (req, res) => {
  try {
    const lesson = await Lesson.findOne({ lessonId: req.params.slug });
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
    res.status(200).json(lesson);
  } catch (error) {
    console.error('Get lesson by slug error:', error);
    res.status(500).json({ message: error.message });
  }
};
