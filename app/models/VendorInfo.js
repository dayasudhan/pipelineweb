var mongoose = require('mongoose');
//Schema
var VendorInfoSchema = new mongoose.Schema({
	name:String,
    username:String,
    email: String,
    id:String,
    phone:Number, 
    address:{
      addressLine1:String,
      addressLine2:String,
      street:String, 
      LandMark:String, 
      areaName:String,
      city:String, 
      zip:String, 
      latitude:Number,
      longitude:Number 
  },
    paid:Number,
    members:[{
                name:String,
                phoneno:String,
                emailid:String,
                time:Date
    }]
    });

//Model
var VendorInfoModel = mongoose.model( 'VendorInfoSchema', VendorInfoSchema );

module.exports = VendorInfoModel;
