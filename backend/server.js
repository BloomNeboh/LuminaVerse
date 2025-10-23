const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json({limit: '5mb'}));

// connect mongo
mongoose.connect(process.env.MONGO_URI).then(()=>console.log('MongoDB connected')).catch(err=>console.error(err));

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/tours', require('./routes/tours'));
app.use('/api/music', require('./routes/music'));
app.use('/api/projects', require('./routes/projects'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log('Server running on port', PORT));
