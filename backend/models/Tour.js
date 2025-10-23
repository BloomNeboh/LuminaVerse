const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({ title:String, description:String, price:Number, itinerary:Array, premium:Boolean });
module.exports = mongoose.model('Tour', tourSchema);
