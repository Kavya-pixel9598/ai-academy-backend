// scripts/insertLessons.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Lesson = require('../models/Lesson'); // Make sure you already have Lesson model created

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Bulk Upload'))
  .catch((err) => console.error('MongoDB Connection Error', err));

// Lessons Array
const lessons = [
  {
    title: 'Introduction to AI',
    description: 'Basics of Artificial Intelligence',
    content: `Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think and learn. Applications include speech recognition, expert systems, and robotics.`,
    videoUrl: 'https://www.youtube.com/watch?v=JMUxmLyrhSk'
  },
  {
    title: 'Machine Learning Overview',
    description: 'ML Basics and Learning Types',
    content: `Machine Learning (ML) is a subset of AI that focuses on building systems that learn from and make decisions based on data. Major types include Supervised, Unsupervised, and Reinforcement Learning.`,
    videoUrl: 'https://www.youtube.com/watch?v=Gv9_4yMHFhI'
  },
  {
    title: 'Supervised vs Unsupervised Learning',
    description: 'Understanding ML methods',
    content: `Supervised learning uses labeled data to train models, while unsupervised learning finds hidden patterns or intrinsic structures in input data.`,
    videoUrl: 'https://www.youtube.com/watch?v=8Sw7SAEy_Lg'
  },
  {
    title: 'Deep Learning Introduction',
    description: 'Deep Learning and Neural Networks',
    content: `Deep Learning is part of ML based on neural networks with representation learning. It mimics the human brain in processing data and creating patterns for decision making.`,
    videoUrl: 'https://www.youtube.com/watch?v=aircAruvnKk'
  },
  {
    title: 'Neural Networks',
    description: 'How Neural Networks Work',
    content: `Neural networks are a series of algorithms that mimic the operations of a human brain to recognize relationships between vast amounts of data.`,
    videoUrl: 'https://www.youtube.com/watch?v=aircAruvnKk'
  },
  {
    title: 'Natural Language Processing (NLP)',
    description: 'Basics of NLP and Applications',
    content: `Natural Language Processing involves the interaction between computers and humans through natural language. Key tasks include language translation, sentiment analysis, and speech recognition.`,
    videoUrl: 'https://www.youtube.com/watch?v=8rXD5-xhemo'
  },
  {
    title: 'Computer Vision Basics',
    description: 'Introduction to Computer Vision',
    content: `Computer Vision is a field of AI that trains computers to interpret and understand the visual world, recognizing objects, faces, and even emotions.`,
    videoUrl: 'https://www.youtube.com/watch?v=oXlwWbU8l2o'
  },
  {
    title: 'Reinforcement Learning',
    description: 'Learning via Rewards and Punishments',
    content: `Reinforcement Learning is an area of ML where agents learn to make decisions by performing certain actions and receiving rewards.`,
    videoUrl: 'https://www.youtube.com/watch?v=2pWv7GOvuf0'
  },
  {
    title: 'AI Ethics and Responsibility',
    description: 'Challenges and Ethical Considerations',
    content: `AI ethics is a system of moral principles and techniques intended to inform the development and responsible use of AI technology.`,
    videoUrl: 'https://www.youtube.com/watch?v=BfDQNrVphLQ'
  },
  {
    title: 'AI in Real World',
    description: 'Applications of AI in Industries',
    content: `AI is used in various industries including healthcare, finance, education, and transportation, enhancing efficiency and enabling new capabilities.`,
    videoUrl: 'https://www.youtube.com/watch?v=2ePf9rue1Ao'
  },
  {
    title: 'Time Series Forecasting',
    description: 'Predicting the Future using Past Data',
    content: `Time Series Forecasting involves using historical data to predict future events. Techniques include ARIMA, Exponential Smoothing, and Prophet.`,
    videoUrl: 'https://www.youtube.com/watch?v=OYY5xznPj4g'
  },
  {
    title: 'Speech Recognition Basics',
    description: 'Understanding Speech Recognition',
    content: `Speech recognition allows computers to understand and process human language. It's used in applications like virtual assistants and transcription software.`,
    videoUrl: 'https://www.youtube.com/watch?v=RRodj7LzGZg'
  },
  {
    title: 'Generative AI and GANs',
    description: 'Introduction to Generative Models',
    content: `Generative AI focuses on creating new content. GANs (Generative Adversarial Networks) are a class of ML frameworks designed to generate realistic data.`,
    videoUrl: 'https://www.youtube.com/watch?v=8L11aMN5KY8'
  },
  {
    title: 'ML Model Deployment',
    description: 'Taking Machine Learning Models Live',
    content: `Model deployment refers to integrating a machine learning model into an existing production environment to make practical business decisions based on data.`,
    videoUrl: 'https://www.youtube.com/watch?v=I3C8kWYJ93s'
  },
  {
    title: 'Career Paths in AI & ML',
    description: 'Jobs and Skills Required for AI',
    content: `AI/ML career paths include data scientist, machine learning engineer, AI researcher, and more. Important skills include statistics, programming, and problem-solving.`,
    videoUrl: 'https://www.youtube.com/watch?v=JMUxmLyrhSk'
  }
];

// Insert lessons to DB
const insertLessons = async () => {
  try {
    await Lesson.insertMany(lessons);
    console.log('✅ Lessons Inserted Successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Error Inserting Lessons', error);
    process.exit(1);
  }
};

insertLessons();
