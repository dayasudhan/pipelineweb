var mongoose = require('mongoose');
const LineSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Line'],
      required: true
    },
    coordinates: {
      type: [[[Number]]], // Array of arrays of arrays of numbers
      required: true
    }
  });
  
  const PLineSchema = new mongoose.Schema({
    name: String,
    location: LineSchema
  });

  var PLineModel = mongoose.model( 'PLineSchema', PLineSchema );

module.exports = PLineModel;