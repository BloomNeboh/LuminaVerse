const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// CORS — allow frontend + local dev
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://luminaverse.herokuapp.com' // Your deployed app URL
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ Mongo error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/tours', require('./routes/tours'));
app.use('/api/music', require('./routes/music'));
app.use('/api/projects', require('./routes/projects'));

// Serve frontend (React build)
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
