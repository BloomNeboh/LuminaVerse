const mongoose = require('mongoose');
const musicSchema = new mongoose.Schema({ title:String, url:String, premium:Boolean, artist:String });
module.exports = mongoose.model('Music', musicSchema);
