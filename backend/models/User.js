const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, default: 'User' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fingerprintEnabled: { type: Boolean, default: false },
  biometricPublicKey: { type: String },
  currentChallenge: { type: String },
  subscription: { type: String, enum: ['free','premium'], default: 'free' },
  projectsUnlocked: { type: [String], default: [] }
}, { timestamps: true });
module.exports = mongoose.model('User', userSchema);
