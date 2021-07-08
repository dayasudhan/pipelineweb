var VendorInfoModel = require('../app/models/VendorInfo');
var CustomerInfoModel = require('../app/models/CustomerInfo');
var PlineModel = require('../app/models/LineInfo');
var CountersModel = require('../app/models/counters');
var BloodInfoModel = require('../app/models/BloodInfo');
const parseGpx = require('parse-gpx');
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_API_KEY,
  Promise: Promise
});
const xml2js = require('xml2js');
const fs = require('fs');
const parseTrack = require('parse-gpx/src/parseTrack');

module.exports = function(app, passport) {

// normal routes ===============================================================

// show the home page (will also have our login links)
app.get('/test', function(req, res) {
    res.send('index.ejs');
});

// LOGOUT ==============================
app.get('/logout', function(req, res) {
  console.log('/logout');
  var redirect_url = '/';
    req.logout();
    res.redirect(redirect_url);
});

app.get('/vendor_logout', function(req, res) {
    var redirect_url = '/';
    req.logout();
    res.redirect(redirect_url);
});

app.get('/login', function(req, res) {
    res.render('customer_login.ejs', { message: req.flash('loginMessage') });
});

app.post('/login', function(req, res, next) {
    console.log('post /login');
      console.log(req.body);
  passport.authenticate('local-login', function(err, user, info) {
   
    if (err) {
         console.log("error in login 0");
        return next(err); }
    if (!user) {
         var redirect_url = '/';
            if(req.body.role == 'customer')
            {
                //redirect_url = '/signup';
                console.log("error in login 1");
                 return res.send("0"); 

            } 
            
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      console.log(req.body.role);
      var redirect_url = '/';
      if(req.body.role == 'customer')
      {
        //redirect_url = '/';
        redirect_url = '/p/candidate_update';
        return res.redirect(redirect_url);
      }
      else if(req.body.role == 'vendor') 
      {
       redirect_url = '/p/vendor_details';
        return res.redirect(redirect_url);
      }
    });
  })(req, res, next);
});

app.post('/v1/m/login', function(req, res, next) {
    console.log('post /v1/m/login');
     console.log(req.body);
  passport.authenticate('local-login', function(err, user, info) {
   
    if (err) {console.log('post /v1/m/login  1');return next(err); }
    if (!user) {
        console.log('post /v1/m/login  2');
        return res.send("0"); 
    }
    req.logIn(user, function(err) {
        console.log('post /v1/m/login  3');
      if (err) {
      console.log('post /v1/m/login 4'); 
      

        return next(err); }
       console.log("store the uniqui id") 
              storeVendoruniqueId(req,res,function(req,res){
           console.log("storeVendoruniqueId success");
           
        });
      return res.send("1");
    });
    console.log('post /v1/m/login 5');
  })(req, res, next);
});


// SIGNUP =================================
// show the signup form
app.get('/signup', function(req, res) {
    res.render('customer_signup.ejs', { message: req.flash('signupMessage') });
});

    

app.get('/vendor', function (req, res) {
    res.render('vendor_login', { user : req.user });
});
app.get('/', function (req, res) {
     res.render('customer_login.ejs', { message: req.flash('loginMessage') });
});



app.get('/p/vendor_details', function (req, res) {
    res.render('vendor_details', { user : req.user });
});
app.get('/p/vendor_list', function (req, res) {
  res.render('vendor_list', { user : req.user });
});
app.get('/p/pcustomer_list', function (req, res) {
  res.render('pcustomer_list', { user : req.user });
});
app.get('/map', function (req, res) {
  console.log("request");
 // console.log(req);
  console.log("response");
  //console.log(res);
  //console.log(process.env.PORT);
  //console.log(res);
  
 
  var key2  = process.env.GOOGLE_API_KEY;
  res.render('map.ejs', { key: key2 });
});
app.get('/etrex', function (req, res) {
  console.log("request");
 // console.log(req);
  console.log("response");
  //console.log(res);
  //console.log(process.env.PORT);
  //console.log(res);
  
 
  var key2  = process.env.GOOGLE_API_KEY;
  res.render('etrex.ejs', { key: key2 });
});
app.get('/file', function (req, res) {
  console.log("request");
 // console.log(req);
  console.log("response");
  //console.log(res);
  //console.log(process.env.PORT);
  //console.log(res);
  
 
  var key2  = process.env.GOOGLE_API_KEY;
  res.render('file.ejs', { key: key2 });
});
app.get('/p/vendor_login', function (req, res) {
    res.render('vendor_login', { user : req.user });
});

app.get('/p/vendor_signup', function(req, res) {
    res.render('vendor_signup', { });
});
app.get('/p/vendor_reset', function(req, res) {
    res.render('vendor_reset', { });
});
app.get('/about_us', function (req, res) {
    res.render('about_us', { user : req.user });
});

app.get('/admin', function (req, res) {
    res.render('admin_login', { user : req.user });
});

app.get('/p/inbox', function (req, res) {
    console.log(req.user);
    res.render('inbox', { user : req.user });
});
app.get('/p/myposts', function (req, res) {
    console.log(req.user);
    res.render('myposts', { user : req.user });
});
app.get('/p/scrollimages', function (req, res) {
    console.log(req.user);
    res.render('scrollimages', { user : req.user });
});
app.post('/p/vendor_reset', function(req, res, next) {
console.log(req.body);
  if(req.body.password != req.body.password2)
  {
     
  console.log("password mimatchmatch");
     return res.send('ERROR');
  }
  else if(req.body.adminpassword != "hirebasuru")
  {
      console.log("adminpassword mimatchmatch");
     return res.send('ERROR');
  }
  else
  {
    console.log("password match");
  }
  console.log('/vendor_reset');
    passport.authenticate('local-reset', function(err, user, info) {
     console.log(req.body);
      if (err) { 
        return next(err); }
      if (!user) { 
          return res.send("0");
      }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
 
        return res.send("1");
      
       
      });
    })(req, res, next);
});


app.post('/p/vendor_signup', function(req, res, next) {
console.log(req.body);
  if(req.body.password != req.body.password2)
  {
     
  console.log("password mimatchmatch");
     return res.send('ERROR');
  }
  else if(req.body.adminpassword != "hirebasuru")
  {
      console.log("adminpassword mimatchmatch");
     return res.send('ERROR');
  }
  else
  {
    console.log("password match");
  }
    console.log('/signup');
    passport.authenticate('local-signup', function(err, user, info) {
     console.log(req.body);
      if (err) { 
        return next(err); }
      if (!user) { 
          var redirect_url = '/p/vendor_signup';
          return res.redirect(redirect_url); 
       }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        console.log(req.body.role);
        var redirect_url = '/p/vendor_details';
        registerVendor(req, res, next);
        return res.redirect(redirect_url);
      });
    })(req, res, next);
});

function registerVendor(req, res, next) {
  console.log("/registerVendor");
  var hotel_id = "V";
  var res = getNextSequence('vendor',function(data) {

    hotel_id = hotel_id + data.sequence;
    console.log(hotel_id);

      var vendorInfo = new VendorInfoModel({
        username:req.body.email,
        id:hotel_id
      });
      vendorInfo.save( function( err ) {
        if( !err ) {
              console.log( 'registerVendor created' );
              console.log(req.body.email);
                  req.session.save(function (err) {
                    if (err) {
                        console.log( 'registerVendor save error' );
                      return next(err);
                    }
                    console.log( 'registerVendor save complete' );
                  });
              return ;
              } else {
                console.log( 'registerVendor error' );
                console.log( err );
                return response.send('ERROR');
              }
        });
    });
};

app.get( '/v1/admin/account/all', function( request, response ) {

    return VendorInfoModel.find(function( err, order ) {
        if( !err ) {
            return response.send( order );
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
});

app.get( '/v1/vendor/info/:id', function( request, response ) {
  console.log("GET --/v1/vendor/info/");

  return VendorInfoModel.find({ 'username':request.params.id},
    function( err, vendor ) {
      if( !err ) {
        
          return response.send( vendor );
      } else {
          console.log( err );
          return response.send('ERROR');
      }
  });
});

app.post( '/v1/vendor/info/:id', function( req, res ) {
    console.log("VendorInfo post");
    console.log(req.body);
    storeVendorInfo(req,res,function(req,res){
      console.log("storeVendorInfo success");
    });
});

function storeVendorInfo(request,response,callback,param)
{
console.log("storeVendorInfo");
console.log(request.params.id);
console.log(request.body);
 VendorInfoModel.update({ 'username':request.params.id},
      {
        name:request.body.name,
        email:request.body.email, 
        phone:request.body.phone 
      },
       function( err ) {
        if( !err ) {
            console.log( 'storeVendorInfo created' );
            callback(request,response);
            return ;
        } else {
         console.log( 'storeVendorInfo error' );
            console.log( err );
            return response.send('ERROR');
        }
    });
}
app.post( '/v1/customer/info/:id', function( req, res ) {
  console.log("CustomerInfo post");
  console.log(req.body);
  storeCustomerInfo(req,res,function(req,res){
    console.log("CustomerInfo success");
  });
});

function storeCustomerInfo(request,response,callback,param)
{
console.log("storeCustomerInfo");
console.log(request.params.id);

CustomerInfoModel.update({ 'username':request.params.id},
    {
      name:request.body.name,
      email:request.body.email, 
      phone:request.body.phone 
    },
     function( err ) {
      if( !err ) {
          console.log( 'storeCustomerInfo created' );
          callback(request,response);
          return ;
      } else {
       console.log( 'storeCustomerInfo error' );
          console.log( err );
          return response.send('ERROR');
      }
  });
}
function storeVendoruniqueId(request,response,callback,param)
{
console.log("storeVendorUniquiId");
console.log(request.params.id);
 VendorInfoModel.update({ 'hotel.email':request.body.email},
      {
        uniqueid:request.body.uniqueid
      },
       function( err ) {
        if( !err ) {
            console.log( 'storeVendorUniquiId created' );
            callback(request,response);
            return ;
        } else {
         console.log( 'storeVendorUniquiId error' );
            console.log( err );
            return response.send('ERROR');
        }
    });
}



//unregister a book
app.delete( '/v1/vendor/unregister/:id', function( request, response ) {
        return VendorInfoModel.remove( { 'hotel.email':request.params.id},function( err ) {
            if( !err ) {
                console.log( 'Book removed' );
                return response.send( '' );
            } else {
                console.log( err );
                return response.send('ERROR');
            }
        });
    //});
});

app.get('/ping', function(req, res){
    res.status(200).send("pong!");
});


app.get( '/v1/admin/vendor/all', function( request, response ) {

    return VendorInfoModel.find(function( err, order ) {
        if( !err ) {
            return response.send( order );
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
});
app.get( '/v1/admin/customer/all', function( request, response ) {

  return CustomerInfoModel.find(function( err, order ) {
      if( !err ) {
          return response.send( order );
      } else {
          console.log( err );
          return response.send('ERROR');
      }
  });
});
app.get( '/v1/admin/counters/all', function( request, response ) {
    console.log("get /v1/admin/counters");
    return CountersModel.find(function( err, order ) {
        if( !err ) {
            return response.send( order );
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
});

app.post( '/v1/admin/counters/:id', function( request, response ) {
    console.log("post /v1/admin/counters");
    console.log(request.params.id);
     //var dd = {'cityName':"dvg",'subAreas':[{'name':"rajajinagar"},{'name':"vijaynagar"}]};
     console.log("post /v1/admin/counters 1");
     var dd = {_id:request.params.id,
                sequence:0};
                console.log("post /v1/admin/counters 2");
      var counters = new CountersModel(
         dd);
         console.log("post /v1/admin/counters 1");
        return counters.save(function( err) {
        if( !err ) {
            console.log("no error");
            console.log(counters);
            return response.send(counters);
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
});
app.post( '/v1/etrexline', function( request, response ) {
  console.log("post /v1/etrexline");
  console.log(request.body);
  //console.log(request.body.coordinates);
 
 var ar = [];
  for(var i = 0; i < request.body.coordinates.length ; i++)
  {
    var cord = [request.body.coordinates[i].latitude ,request.body.coordinates[i].longitude];
    ar.push(cord);
    
  }
  console.log(ar);
  var indiantime = new Date();;
  indiantime.setHours(indiantime.getHours() + 5);
  indiantime.setMinutes(indiantime.getMinutes() + 30);
  //new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate());
  console.log(indiantime);
 
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

var newtime = months[indiantime.getMonth()] + " " +  indiantime.getDate() + " " + indiantime.getFullYear();
console.log(newtime);
  request.body.coordinates = ar;
  var phoneNumber = parseInt(request.body.phone);
   var pline = { name: request.body.name, 
     phone: phoneNumber, 
     paid:request.body.paid,
     vendor_username:request.body.vendorusername,
     date:newtime,
     size:request.body.size,
     remarks:request.body.remarks,
     pipe_type:request.body.pipe_type,
     purpose:request.body.purpose,
     live:request.body.live,
     location: request.body }; 
     var pipeline = new PlineModel(pline);
     console.log("post etrexline");
     return pipeline.save(function( err) {
     if( !err ) {
         console.log("no error");
         console.log(pipeline);
         return response.send(pipeline); 
     } else {
         console.log( err );
         return response.send('ERROR');
     }
 });
});
app.post( '/v1/pline/:id', function( request, response ) {
   console.log("post /v1/pline");
   console.log(request.body);
   //console.log(request.body.coordinates);
  
  var ar = [];
   for(var i = 0; i < request.body.coordinates.length ; i++)
   {
     var cord = [request.body.coordinates[i].latitude ,request.body.coordinates[i].longitude];
     ar.push(cord);
     
   }
   console.log(ar);
   var indiantime = new Date();;
   indiantime.setHours(indiantime.getHours() + 5);
   indiantime.setMinutes(indiantime.getMinutes() + 30);
   //new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate());
   console.log(indiantime);
  
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

var newtime = months[indiantime.getMonth()] + " " +  indiantime.getDate() + " " + indiantime.getFullYear();
console.log(newtime);
   request.body.coordinates = ar;
   var phoneNumber = parseInt(request.body.phone);
    var pline = { name: request.body.name, 
      phone: phoneNumber, 
      paid:request.body.paid,
      vendor_username:request.body.vendorusername,
      date:newtime,
      size:request.body.size,
      remarks:request.body.remarks,
      pipe_type:request.body.pipe_type,
      purpose:request.body.purpose,
      live:request.body.live,
      location: request.body }; 
      var pipeline = new PlineModel(pline);
      console.log("post /v1/pline/1");
      return pipeline.save(function( err) {
      if( !err ) {
          console.log("no error");
          console.log(pipeline);
          return response.send(pipeline); 
      } else {
          console.log( err );
          return response.send('ERROR');
      }
  });
});
app.get( '/v1/elevation', function( request, response ) {
  googleMapsClient.elevation({
    locations:  [ '14.4201106,74.0684507'],  //latlong format

  }).asPromise().then((response) => {
    console.log(response.json.results)
  })
    .catch(err => console.log(err));
});
app.get( '/v1/elevationpath', function( request, response ) {
  googleMapsClient.elevationAlongPath({
    path: ['14.1460526,75.68239130000006|14.1444515,75.67876219999994|14.1426074,75.67759909999995|14.1369133,75.67317609999998| 14.1368819,75.67534799999999'],  //latlong format 
    samples: 5
  }).asPromise().then((response) => {
    console.log(response.json.results)
  })
    .catch(err => console.log(err));
});


// app.post( '/v1/plinewithelevation2/:id', function( request, response ) {



// });
app.post( '/v1/plinewithelevation/:id', function( request, response ) {
  console.log("post /v1/pline2");
  console.log(request.body);

 var ar = [];
 
 for(var i = 0; i < request.body.coordinates.length ; i++)
 {
   var cord = [request.body.coordinates[i][0] ,request.body.coordinates[i][1]];
   ar.push(cord);
   
 }
//  console.log(path1);
  console.log(request.body.coordinates.length);
//  var path2 =  '\'' +path1 + '\'' ;
//  console.log(path2);
//  var path3 = new String(path2);
// console.log(path3);
 googleMapsClient.elevationAlongPath({
  path:  ar,
  samples: request.body.coordinates.length
}).asPromise().then((response2) => {
  var ar1 = [];
  for(var i = 0; i < response2.json.results.length ; i++)
  {
    var cord = [response2.json.results[i].location.lat ,response2.json.results[i].location.lng,
    response2.json.results[i].elevation,response2.json.results[i].resolution];
    ar1.push(cord);
   
  }
  console.log(ar1);
  var indiantime = new Date();;
  indiantime.setHours(indiantime.getHours() + 5);
  indiantime.setMinutes(indiantime.getMinutes() + 30);
  //new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate());
  console.log(indiantime);
 
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

var newtime = months[indiantime.getMonth()] + " " +  indiantime.getDate() + " " + indiantime.getFullYear();
console.log(newtime);
  request.body.coordinates = ar1;
  var phoneNumber = parseInt(request.body.phone);
   var pline = { name: request.body.name, 
     phone: phoneNumber, 
     paid:request.body.paid,
     vendor_username:request.body.vendorusername,
     date:newtime,
     size:request.body.size,
     remarks:request.body.remarks,
     pipe_type:request.body.pipe_type,
     purpose:request.body.purpose,
     live:request.body.live,
     location: request.body }; 
     var pipeline = new PlineModel(pline);
     console.log("post /v1/pline/1");
     return pipeline.save(function( err) {
     if( !err ) {
         console.log("no error");
         console.log(pipeline);
         return response.send(pipeline); 
     } else {
         console.log( err );
         return response.send('ERROR');
     }
 });
})
  .catch(err => console.log(err));

 
  // for(var i = 0; i < request.body.coordinates.length ; i++)
  // {
  //   var cord = [request.body.coordinates[i][0] ,request.body.coordinates[i][1]];
  //   ar.push(cord);
    
  // }
 // console.log(ar);

});
app.post( '/v1/pline3/:id', function( request, response ) {
  console.log("post /v1/pline");
  console.log(request.body);
  console.log(request.body.coordinates);
  console.log(request.body.name);
  //console.log(request.body.coordinates);
 
 var ar = [];
  for(var i = 0; i < request.body.coordinates.length ; i++)
  {
   
    var cord = [request.body.coordinates[i][1] ,request.body.coordinates[i][0],request.body.coordinates[i][2]];
    ar.push(cord);
    
  }
  console.log(ar);
  var indiantime = new Date();;
  indiantime.setHours(indiantime.getHours() + 5);
  indiantime.setMinutes(indiantime.getMinutes() + 30);
  //new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate());
  console.log(indiantime);
 
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

var newtime = months[indiantime.getMonth()] + " " +  indiantime.getDate() + " " + indiantime.getFullYear();
console.log(newtime);
  request.body.coordinates = ar;
  var phoneNumber = parseInt(request.body.phone);
   var pline = { name: request.body.name, 
     phone: phoneNumber, 
     paid:request.body.paid,
     vendor_username:request.body.vendorusername,
     date:newtime,
     size:request.body.size,
     remarks:request.body.remarks,
     pipe_type:request.body.pipe_type,
     purpose:request.body.purpose,
     live:request.body.live,
     location: request.body }; 
     var pipeline = new PlineModel(pline);
     console.log("post /v1/pline/1");
     return pipeline.save(function( err) {
     if( !err ) {
         console.log("no error");
         console.log(pipeline);
         return response.send(pipeline); 
     } else {
         console.log( err );
         return response.send('ERROR');
     }
 });
});
app.post( '/v1/pline2/:id', function( request, response ) {
  console.log("post /v1/pline2");
  console.log(request.body);
  //console.log(request.body.coordinates);
  var ar = [];
 var ar1 =  [
  [75.66197248214134,14.20446620000724,557.1664447645021 ],
  [75.66217849855721,14.20435318670938,556.6664297692231  ],
  [75.66229262401362,14.20428436117039,556.5263224061788   ],
  [75.6623487103943,14.20422873664778,556.2171964598442  ],
  [75.66265495007457,14.20400367556546,556.0870355972025 ],
  [75.66306326886476,14.20373785657268,556.1720829277316 ],
  [75.66331627887459,14.20356896875952,556.3951593698308 ],
  [75.66354558960427,14.20344949244943,556.5564385461248 ],
  [75.66423326558755,14.20308349112132,556.3896032505378 ],
  [75.6646522889768,14.20287408386504,556.0482343507327 ],
  [75.66500549992298,14.20278313203338,555.380607570678 ],
  [75.66520017744335,14.20270112341319,555.4091834895459 ],
  [75.66554069688743,14.20252133239092,554.981000916489],
  [75.66560346822416,14.20247272026212,555.0084263965966 ]

];
  for(var i = 0; i < ar1.length ; i++)
  {
    var cord = [ar1[i][1] ,ar1[i][0],ar1[i][2]];
    ar.push(cord);
    
  }
  console.log(ar);
  var indiantime = new Date();;
  indiantime.setHours(indiantime.getHours() + 5);
  indiantime.setMinutes(indiantime.getMinutes() + 30);
  //new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate());
  console.log(indiantime);
 
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

var newtime = months[indiantime.getMonth()] + " " +  indiantime.getDate() + " " + indiantime.getFullYear();
console.log(newtime);
  request.body.coordinates = ar;
  request.body.type = "Line";
  var phoneNumber = parseInt(9566229075);
   var pline = { name: request.body.name, 
     phone: phoneNumber, 
     paid:request.body.paid,
     vendor_username:request.body.vendorusername,
     date:newtime,
     size:request.body.size,
     remarks:request.body.remarks,
     pipe_type:request.body.pipe_type,
     purpose:request.body.purpose,
     live:request.body.live,
     location: request.body }; 
     var pipeline = new PlineModel(pline);
     console.log("post /v1/pline/1");
     return pipeline.save(function( err) {
     if( !err ) {
         console.log("no error");
         console.log(pipeline);
         return response.send(pipeline); 
     } else {
         console.log( err );
         return response.send('ERROR');
     }
 });
});
app.post( '/v1/pline3/:id', function( request, response ) {
  console.log();
  var pipeline = new PlineModel(request.body);
  return pipeline.save(function( err) {
    if( !err ) {
        console.log("no error");
        console.log(pipeline);
        return response.send(pipeline); 
    } else {
        console.log( err );
        return response.send('ERROR');
    }
});
});
app.get( '/v1/plinemap/all', function( request, response ) {

    return PlineModel.find(function( err, order ) {
      if( !err ) {
          return response.send( order );
      } else {
          console.log( err );
          return response.send('ERROR');
      }
  });
});
app.get( '/v1/plinemap/phone/:id', function( request, response ) {
  console.log(request.body);
  console.log(request.params.id);
    return PlineModel.find({'phone':request.params.id},function( err, order ) {
      if( !err ) {
          return response.send( order );
      } else {
          console.log( err );
          return response.send('ERROR');
      }
  });
});
app.get( '/v1/plinemap/phonelive/:id/:phone', function( request, response ) {
  console.log(request.body);
  console.log(request.params.id);
  console.log(request.params.phone);
  var phoneNumber = parseInt(request.params.phone);
  console.log(phoneNumber);
    return PlineModel.find({'live':request.params.id,'phone':phoneNumber},function( err, order ) {
      if( !err ) {
          return response.send( order );
      } else {
          console.log( err );
          return response.send('ERROR');
      }
  });
});
app.get( '/v1/plinemap/phoneliveall/:id', function( request, response ) {
  console.log(request.body);
  console.log(request.params.id);
  console.log(request.params.phone);
  var phoneNumber = parseInt(request.params.phone);
  console.log(phoneNumber);
    return PlineModel.find({'live':request.params.id},function( err, order ) {
      if( !err ) {
          return response.send( order );
      } else {
          console.log( err );
          return response.send('ERROR');
      }
  });
});
app.post( '/v1/plinemap/phoneliveall/geowithin/:id', function( request, response ) {
  console.log(request.body);
  var coordinates = [[
    [request.body.northeastlatitude,request.body.northeastlongitude],
    [request.body.northeastlatitude,request.body.southwestlongitude],
    [request.body.southwestlatitude,request.body.southwestlongitude],
    [request.body.southwestlatitude,request.body.northeastlongitude],
    [request.body.northeastlatitude,request.body.northeastlongitude]
  ]];
  console.log(coordinates);
  var geojsonPoly = { type: 'Polygon', coordinates: coordinates};
  console.log(geojsonPoly);
  console.log(request.params.id);
  return PlineModel.find({'location.coordinates':{ $within: { $geometry: geojsonPoly }},'live':request.params.id},function( err, order ) {
      if( !err ) {
          return response.send( order );
      } else {
          console.log( err );
          return response.send('ERROR');
      }
  });
});
app.post( '/v1/gpxwaypointstojson', function( request, response )  
{
  console.log("post /v1/gpxwaypointstojson");

 var data  = request.body.content;

 var ar = [];
 let parser = new xml2js.Parser();
  parser.parseString(data, (err, xml) => {
      if(err) {
          console.log(err);
      } else {
      //  console.log(xml);
        console.log(xml.gpx.wpt);
        var tracks = xml.gpx.wpt;
        console.log(tracks.length);
         for(var i = 0; i < tracks.length ; i++)
        {
          var floatlat = parseFloat(tracks[i]['$'].lat);
          var floatlong = parseFloat(tracks[i]['$'].lon);
          var floatElev = parseFloat(tracks[i].ele[0]);

          var cord = [floatlat ,floatlong,floatElev];
          var cord = [floatlat ,floatlong,floatElev,tracks[i].name[0]];
          ar.push(cord);
          console.log(i + " = " + cord); 
         }
         console.log(1,ar);
         request.body.coordinates = ar;
         request.body.type = "Point";
           
           
            console.log("post /v1/gpxwaypointstojson");
            PlineModel.findOneAndUpdate( { 'phone':request.body.phone, 'live':  'yes'},
            { markers :request.body     },function( err,pipeline) {
            if( !err ) {
                console.log("no error");
                console.log(pipeline);
                return response.send(pipeline); 
            } else {
                console.log( err );
                return response.send('ERROR');
            }
          });
      }
  });

   
});
app.post( '/v1/gpxdatatojson', function( request, response )  
{
  console.log("post /v1/gpxdatatojson");
 console.log(request.body.phone);
 var data  = request.body.content;

 var ar = [];
 let parser = new xml2js.Parser();
  parser.parseString(data, (err, xml) => {
      if(err) {
          console.log(err);
      } else {
        var tracks = parseTrack(xml.gpx.trk);
        
         for(var i = 0; i < tracks.length ; i++)
        {
          var floatlat = parseFloat(tracks[i].latitude);
          var floatlong = parseFloat(tracks[i].longitude);
          var floatElev = parseFloat(tracks[i].elevation);
          console.log(floatlat,"=",tracks[i].latitude);
          console.log(floatlong,"=",tracks[i].longitude);
          console.log(floatElev,"=",tracks[i].elevation);
          var cord = [floatlat ,floatlong,floatElev];
          ar.push(cord);
          console.log(i + " = " + cord); 
         }
         console.log(1,ar);
         request.body.coordinates = ar;
         request.body.type = "Line";

        var indiantime = new Date();
        indiantime.setHours(indiantime.getHours() + 5);
        indiantime.setMinutes(indiantime.getMinutes() + 30);
        console.log(indiantime);
        var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        var newtime = months[indiantime.getMonth()] + " " +  indiantime.getDate() + " " + indiantime.getFullYear();

         var phoneNumber = parseInt(request.body.phone);
          var pline = { 
            name: request.body.name, 
            phone: phoneNumber, 
            size:request.body.size,
            remarks:request.body.remarks,
            pipe_type:request.body.pipe_type,
            purpose:request.body.purpose,
            live:request.body.live,
            paid:request.body.paid,
            vendor_username:request.body.vendorusername,
            date:newtime,
            location: request.body }; 
            var pipeline = new PlineModel(pline);
           
            console.log("post /v1/gpxdatatojson");
            console.log(pipeline);
            return pipeline.save(function( err) {
            if( !err ) {
                console.log("no error");
                console.log(pipeline);
                return response.send(pipeline); 
            } else {
                console.log( err );
                return response.send('ERROR');
            }
        });
      }
  });
  
});
app.post( '/v1/gpxtojson', function( request, response )  
{
  console.log("post /v1/gpxtojson");
  console.log(request.body);
  var filePath =request.body.filepath;
  console.log(filePath);
  var ar = [];
  parseGpx(filePath).then(track => {
    //console.log(track);
      console.log(track.length); // 43.512926660478115
      for(var i = 0; i < track.length ; i++)
      {
        var cord = [track[i].latitude ,track[i].longitude,track[i].elevation];
        ar.push(cord);
        console.log(i + " = " + cord); 
       }
       console.log(1,ar);
 

    var indiantime = new Date();;
    indiantime.setHours(indiantime.getHours() + 5);
    indiantime.setMinutes(indiantime.getMinutes() + 30);
    //new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate());
    console.log(indiantime);
  
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    var newtime = months[indiantime.getMonth()] + " " +  indiantime.getDate() + " " + indiantime.getFullYear();
    console.log(newtime);
    request.body.coordinates = ar;
    var phoneNumber = parseInt(request.body.phone);
     var pline = { name: request.body.name, 
       phone: phoneNumber, 
       paid:request.body.paid,
       vendor_username:request.body.vendorusername,
       date:newtime,
       size:request.body.size,
       remarks:request.body.remarks,
       pipe_type:request.body.pipe_type,
       purpose:request.body.purpose,
       live:request.body.live,
       location: request.body }; 
       var pipeline = new PlineModel(pline);
      
       console.log("post /v1/gpxtojson");
       console.log(pipeline);
       return pipeline.save(function( err) {
       if( !err ) {
           console.log("no error");
           console.log(pipeline);
           return response.send(pipeline); 
       } else {
           console.log( err );
           return response.send('ERROR');
       }
   });

  });//parsegpx

});
app.get( '/v1/plinemap/:id', function( request, response ) {
  console.log(request.body);
  console.log(request.params.id);
    return PlineModel.find({'vendor_username':request.params.id},function( err, order ) {
      if( !err ) {
          return response.send( order );
      } else {
          console.log( err );
          return response.send('ERROR');
      }
  });
});
app.post( '/v1/plinemap/geowithin', function( request, response ) {
  console.log(request.body);
  // var colordo = [[
  //   [14.1603438,75.6205914],
  //   [14.0697727,75.6018832],
  //   [14.0510405,75.7768592],
  //   [14.2538865,75.7388695],
  //   [14.1603438,75.6205914]
  // ]];
  var coordinates = [[
    [request.body.northeastlatitude,request.body.northeastlongitude],
    [request.body.northeastlatitude,request.body.southwestlongitude],
    [request.body.southwestlatitude,request.body.southwestlongitude],
    [request.body.southwestlatitude,request.body.northeastlongitude],
    [request.body.northeastlatitude,request.body.northeastlongitude]
  ]];
  console.log(coordinates);
//  { northeastlatitude: '14.1603438',
//   northeastlongitude: '75.6205914',
//   southwestlatitude: '14.0510405',
//   southwestlongitude: '75.7768592' }
  var geojsonPoly = { type: 'Polygon', coordinates: coordinates};
  console.log(geojsonPoly);
  return PlineModel.find({'location.coordinates':{ $within: { $geometry: geojsonPoly }}},function( err, order ) {
      if( !err ) {
          return response.send( order );
      } else {
          console.log( err );
          return response.send('ERROR');
      }
  });
});
app.post( '/v1/plinemap/nearby', function( request, response ) {
  console.log(request.body.coordinates);
 
  var geojsonPoly = { type: 'Point', coordinates: request.body.coordinates};
  console.log(geojsonPoly);
  var METERS_PER_MILE = 1609.34
//db.restaurants.find({ location: { $nearSphere: { $geometry: { type: "Point", coordinates: [ -73.93414657, 40.82302903 ] }, $maxDistance: 5 * METERS_PER_MILE } } })
  return PlineModel.find({'location.coordinates':{  $nearSphere: { $geometry: geojsonPoly, 
    $maxDistance: 5 * METERS_PER_MILE } } },function( err, order ) {
      if( !err ) {
          return response.send( order );
      } else {
          console.log( err );
          return response.send('ERROR');
      }
  });
});
app.delete( '/v1/plinemap/:id', function( request, response ) {
  return PlineModel.remove( { '_id':request.params.id},function( err ) {
      if( !err ) {
          console.log( 'plinemap removed' );
          return response.send( 'success removed' + request.params.id );
      } else {
          console.log( err );
          return response.send('ERROR');
      }
  });
//});
});
function getNextSequence(name,result)
{
   
    var ret = CountersModel.findOneAndUpdate(
            { _id: name },
            { $inc: { sequence: 1 }} ,
        function( err, order ) 
        {
        if( !err ) {
            console.log("no error");
            console.log(order);
            ret2 = order;
            result(order);
           // return order;
         
        } else {
            console.log( err );
           result(err);
        }
    });

}

app.delete( '/v1/admin/counters/:id', function( request, response ) {
        return CountersModel.remove( { '_id':request.params.id},function( err ) {
            if( !err ) {
                console.log( 'counter removed' );
                return response.send( '' );
            } else {
                console.log( err );
                return response.send('ERROR');
            }
        });
    //});
});
////////team bloodgroup
app.post( '/v1/blood/registerBlood', function( req, res ) {
  registerBlood(req, res,null);
});
function registerBlood(req, res, next) {
  console.log("/registerVendor");
  var hotel_id = "B";
  var res = getNextSequence('blood',function(data) {

    hotel_id = hotel_id + data.sequence;
    console.log(hotel_id);

      var vendorInfo = new BloodInfoModel({
        username:'thirthalli',
        id:hotel_id
      });
      vendorInfo.save( function( err ) {
        if( !err ) {
              console.log( 'registerVendor created' );
              //console.log(req.body.email);
                  // req.session.save(function (err) {
                  //   if (err) {
                  //       console.log( 'registerVendor save error' );
                  //     return next(err);
                  //   }
                  //   console.log( 'registerVendor save complete' );
                  
                  // });
                  return response.send('SUCCESS');
              } else {
                console.log( 'registerVendor error' );
                console.log( err );
                return response.send('ERROR');
              }
        });
    });
};

app.get( '/v1/blood/account/all', function( request, response ) {

  return BloodInfoModel.find(function( err, order ) {
      if( !err ) {
          return response.send( order );
      } else {
          console.log( err );
          return response.send('ERROR');
      }
  });
});

app.get( '/v1/blood/info/:id', function( request, response ) {
console.log("GET --/v1/blood/info/");

return  BloodInfoModel.find({ 'username':request.params.id},
  function( err, vendor ) {
    if( !err ) {
      
        return response.send( vendor );
    } else {
        console.log( err );
        return response.send('ERROR');
    }
});
});

app.post( '/v1/blood/info/:id', function( req, res ) {
  console.log("bloodInfo post");
  console.log(req.body);
  storeBloodInfo(req,res,function(req,res){
    console.log("storebloodInfo success");
    return;
  });
});

function storeBloodInfo(request,response,callback,param)
{
console.log("storeBloodInfo");
console.log(request.params.id);
console.log(request.body);
BloodInfoModel.updateOne({ 'username':request.params.id},
    {
      name:request.body.name,
      bloodgroup:request.body.bloodgroup, 
      phone:request.body.phone 
    },
     function( err ) {
      if( !err ) {
          console.log( 'storeBloodInfo created' );
          callback(request,response);
          return ;
      } else {
       console.log( 'storeBloodInfo error' );
          console.log( err );
          return response.send('ERROR');
      }
  });
}
//////
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
    {
      console.log("isLoggedIn");
        return next();
    }
    else
    {
       console.log("not loggedin isLoggedIn");
    }

    res.redirect('/');
}