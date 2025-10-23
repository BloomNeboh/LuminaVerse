const express = require('express'); const router = express.Router();
require('dotenv').config();
router.post('/query', async (req,res)=>{
  const { question } = req.body;
  if(!question) return res.status(400).json({answer:'No question provided.'});
  const OPENAI_KEY = process.env.OPENAI_KEY || process.env.OPENAI;
  if(OPENAI_KEY){
    try{
      const OpenAI = require('openai').OpenAI;
      const client = new OpenAI({ apiKey: OPENAI_KEY });
      const response = await client.chat.completions.create({ model: 'gpt-4o-mini', messages: [{ role: 'user', content: question }], max_tokens: 600 });
      const answer = response.choices && response.choices[0] && response.choices[0].message ? response.choices[0].message.content : 'No answer';
      return res.json({ answer });
    }catch(err){ console.error('OpenAI error',err); return res.json({ answer: 'AI error.' }); }
  }else{
    // simple mock response
    return res.json({ answer: 'This is a demo Nyota response. (Set OPENAI_KEY in backend/.env to enable full AI.)' });
  }
});
module.exports = router;
