var mongoose = require('mongoose');
//Schema
var BloodInfoSchema = new mongoose.Schema({
    username:String,
    members:[{
        name:String,
        id:String,
        phone:Number, 
        bloodgroup:String,
        place:String,
        address:{
            addressLine1:String,
            addressLine2:String,
            street:String, 
            LandMark:String, 
            areaName:String,
            city:String, 
            zip:String      
        }
    }]

    });

//Model
var BloodInfoModel = mongoose.model( 'BloodInfoSchema', BloodInfoSchema );

module.exports = BloodInfoModel;