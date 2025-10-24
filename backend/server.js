const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ---- Dynamic CORS setup ----
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [process.env.FRONTEND_URL]          // deployed frontend
  : ['http://localhost:5173'];          // local dev

app.use(cors({
  origin: allowedOrigins
}));

app.use(express.json({ limit: '5mb' }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/tours', require('./routes/tours'));
app.use('/api/music', require('./routes/music'));
app.use('/api/projects', require('./routes/projects'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
