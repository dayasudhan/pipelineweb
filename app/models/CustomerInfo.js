var mongoose = require('mongoose');
//Schema
var CustomerInfoSchema = new mongoose.Schema({
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
    paid:Number
    });

//Model
var CustomerInfoModel = mongoose.model( 'CustomerInfoSchema', CustomerInfoSchema );

module.exports = CustomerInfoModel;
