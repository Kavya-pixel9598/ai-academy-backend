const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

// Public routes for lessons - no auth middleware for now
router.get('/', lessonController.getLessons); // Get all lessons
router.get('/slug/:slug', lessonController.getLessonBySlug); // Get lesson by slug (lessonId)
router.get('/:id', lessonController.getLessonById); // Get lesson by MongoDB _id
router.post('/', lessonController.createLesson); // Create lesson (admin use)

module.exports = router;

