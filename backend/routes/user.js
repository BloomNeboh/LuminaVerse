const express = require('express'); const router = express.Router();
const User = require('../models/User'); const auth = require('../middleware/auth');

router.get('/me', auth, async (req,res)=>{ const user = await User.findById(req.user.id).select('-password'); res.json(user); });
router.put('/fingerprint-toggle', auth, async (req,res)=>{ const {enable} = req.body; const user = await User.findById(req.user.id); user.fingerprintEnabled = enable; await user.save(); res.json({message:'ok'}); });
router.put('/register-biometric', auth, async (req,res)=>{ const {publicKey} = req.body; const user = await User.findById(req.user.id); user.biometricPublicKey = publicKey; user.fingerprintEnabled = true; await user.save(); res.json({message:'registered'}); });
router.put('/subscription', auth, async (req,res)=>{ const {tier} = req.body; const user = await User.findById(req.user.id); user.subscription = tier; await user.save(); res.json({message:'ok'}); });

module.exports = router;
