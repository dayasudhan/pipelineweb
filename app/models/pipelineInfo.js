var mongoose = require('mongoose');
//Schema
var PipelineSchema = new mongoose.Schema({
	name:String,
    vendor_username:String,
    id:String,
    phone:Number, 
    paid:Number,
    coordinates:[{
                lat:String,
                longt:String
            }],
    loc: { type: String, coordinates: [Number] },
    });

//Model
var PipelineModel = mongoose.model( 'PipelineSchema', PipelineSchema );

module.exports = PipelineModel;
