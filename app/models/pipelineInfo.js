var mongoose = require('mongoose');
//Schema
var PipelineSchema = new mongoose.Schema({
	name:String,
    username:String,
    id:String,
    phone:Number, 
    paid:Number,
    coordinates:[{
                lat:String,
                longt:String
            }]
    });

//Model
var PipelineModel = mongoose.model( 'PipelineSchema', PipelineSchema );

module.exports = PipelineModel;
