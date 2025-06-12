const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Lesson = require('./models/Lesson');
const lessonsData = require('./lessonsData.json');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');

    // Clear existing lessons (optional, for clean upload)
    await Lesson.deleteMany({});
    console.log('Existing lessons cleared');

    // Insert new lessons
    await Lesson.insertMany(lessonsData);
    console.log('Lessons uploaded successfully');

    process.exit(0);
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
