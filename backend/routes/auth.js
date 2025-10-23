const express = require('express'); const router = express.Router();
const User = require('../models/User'); const bcrypt = require('bcryptjs'); const jwt = require('jsonwebtoken');

router.post('/login', async (req,res)=>{
  const {email,password} = req.body;
  const user = await User.findOne({email});
  if(!user) return res.status(400).json({message:'Invalid credentials'});
  const match = await bcrypt.compare(password, user.password);
  if(!match) return res.status(400).json({message:'Invalid credentials'});
  const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d'});
  res.json({token, user:{id:user._id,name:user.name,email:user.email,subscription:user.subscription}});
});

module.exports = router;
