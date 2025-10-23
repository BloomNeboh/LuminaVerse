const express = require('express'); const router = express.Router();
const Project = require('../models/Project');
router.get('/', async (req,res)=>{ const items = await Project.find(); res.json(items); });
module.exports = router;
