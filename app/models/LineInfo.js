var mongoose = require('mongoose');
const LineSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Line','Point'],
      required: true
    },
    coordinates: {
      type:  Array, // Array of arrays of arrays of numbers
      required: true
    }
  });
  
  const PLineSchema = new mongoose.Schema({
    name: String,
    
    paid:Number,
    vendor_username:String,
    date:String,
    size:String,
    remarks:String,
    pipe_type:String,
    purpose:String,
    live:String,
    location: LineSchema,
    markers: LineSchema,
    phonenos:[{
      phone:Number     
    }]
  });

// var mongoose = require('mongoose');
 
// var LineSchema = new mongoose.Schema({
//     point: mongoose.Schema.Types.Point,
//     multipoint: mongoose.Schema.Types.MultiPoint,
//     linestring: mongoose.Schema.Types.LineString,
//     multilinestring: mongoose.Schema.Types.MultiLineString,
//     polygon: mongoose.Schema.Types.Polygon,
//     multipolygon: mongoose.Schema.Types.MultiPolygon,
//     geometry: mongoose.Schema.Types.Geometry,
//     geometrycollection: mongoose.Schema.Types.GeometryCollection,
//     feature: mongoose.Schema.Types.Feature,
//     featurecollection: mongoose.Schema.Types.FeatureCollection
// });
 

// var model = db.model('GeoJSON', schema);
  var PLineModel = mongoose.model( 'PLineSchema', PLineSchema );

module.exports = PLineModel;