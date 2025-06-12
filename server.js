const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config(); // Load .env variables

const app = express();
app.use(express.json());

// ✅ Smart CORS — allows frontend from localhost:* with Authorization headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // Preflight OK
  }

  next();
});

 // Parse incoming JSON bodies

// ✅ Connect to MongoDB Atlas or fallback to local Mongo
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ai-academy', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// ✅ Import routes
const authRoutes = require('./routes/authRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const quizRoutes = require('./routes/quizRoutes');
const quizResultRoutes = require('./routes/quizResultRoutes');
const adminRoutes = require('./routes/adminRoutes');
const chatRoutes = require('./routes/chatRoutes');

// ✅ Mount all routes
app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/quiz-results', quizResultRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/chat', chatRoutes);

// ✅ Test routes
app.get('/api/test', (req, res) => {
  res.json({ message: '✅ API is working!' });
});

app.get('/', (req, res) => {
  res.send('🌐 Fifth AI/ML Academy Backend is running...');
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
