const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({ title:String, description:String, contentUrl:String, level:Number, premium:Boolean });
module.exports = mongoose.model('Project', projectSchema);
