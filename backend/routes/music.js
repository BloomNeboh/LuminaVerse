const express = require('express'); const router = express.Router();
const Music = require('../models/Music');
router.get('/', async (req,res)=>{ const items = await Music.find(); res.json(items); });
module.exports = router;
