const jwt = require('jsonwebtoken');
module.exports = (req,res,next)=>{
  const auth = req.header('Authorization') || req.header('x-auth-token');
  if(!auth) return res.status(401).json({message:'No token'});
  const token = auth.startsWith('Bearer ') ? auth.split(' ')[1] : auth;
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  }catch(err){ res.status(401).json({message:'Token invalid'}); }
};
