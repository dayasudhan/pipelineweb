var GeoJSON = require('mongoose-geojson-schema');
var VendorInfoModel = require('../app/models/VendorInfo');
var CustomerInfoModel = require('../app/models/CustomerInfo');
var PlineModel = require('../app/models/LineInfo');
var CountersModel = require('../app/models/counters');
//var AWS = require('aws-sdk');
// var multer = require('multer');


var securecustomerkey = 'EjR7tUPWx7WhsVs9FuVO6veFxFISIgIxhFZh6dM66rs';
var securevendorkey = 'ORql2BHQq9ku8eUX2bGHjFmurqG84x2rkDQUNq9Peelw';
var secureadminkey = 'tk0M6HKn0uzL%2FcWMnq3jkeF7Ao%2BtdWyYEJqPDl0P6Ac';
var securewebkey = 'RN4CDXkqltLF%2FWloegKujIhiaSWBrgCzQXqI9cyWpT0';
var version_value_1 = '1';
var client_key_vendor = 'tunga';
var client_key_customer = 'bhoomika';
var client_key_admin = 'gajanuru';
var client_key_web = 'pickcock';

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
app.get('/p/candidate_update', function (req, res) {
    res.render('candidate_update', { user : req.user });
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
     //   console.log(req.body.role);
   //     var redirect_url;
        // if(req.body.role == 'customer')
        // {
       
        //  return CustomerInfoModel.find({ 'phone':req.body.email},function( err, customerInfo ) {
        //     if( !err ) {
        //         return res.send( customerInfo );
        //     } else {
        //         console.log( err );
        //         return res.send('ERROR');
        //     }
        // });
 
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
app.post( '/v1/pline/:id', function( request, response ) {
   console.log("post /v1/pline");
   console.log(request.body);
   console.log(request.body.coordinates);
  
  var ar = [];
   for(var i = 0; i < request.body.coordinates.length ; i++)
   {
     var cord = [request.body.coordinates[i].latitude ,request.body.coordinates[i].longitude];
     ar.push(cord);
     
   }
  
   console.log(ar);
   
   request.body.coordinates = ar;
   var phoneNumber = parseInt(request.body.phone);
    var pline = { name: request.body.name, phone: phoneNumber, paid: request.body.paid,location: request.body }; 
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


app.post( '/v1/pn/register', function( request, response ) {
    console.log("post v1/pn/register");
    console.log(request.body);
 
    if( 1 ) {
            console.log('success');
            
            return response.send('success');
        } else {
            console.log( 'failure' );
            return response.send('failure');
        }

});
app.get( '/v1/pn/vendor/addTofirebase', function( request, response ) {
    console.log("post v1/pn/vendor/addTofirebase");
    console.log(request.body);
 
    //if( request.body.message ) {
            console.log('success');
            var pn = {};
            pn["hdk"]  = {
                info:"request.body.message"
            };
            console.log(pn); // should print  Object { name="John"}
              rootRef.update(
               pn
             );

            return response.send(pn);

     

});
app.get( '/v1/pn/customer/fcm/:id', function( request, response ) {
      console.log("post v1/pn/customer/addTofirebase");
     
      var topic = request.params.id;

// See the "Defining the message payload" section below for details
// on how to define a message payload.
      var payload = {
       notification: {
        title: "Hello World2! ",
        icon: "appicon",
        
        body: "Here is a not2222ification's body.",
    },
  data: {
       image: "https://s3.ap-south-1.amazonaws.com/chunavane/hdk/images.jpg"
  }
      };  
      admin.messaging().sendToTopic(topic, payload)
      .then(function(response2) {
        // See the MessagingTopicResponse reference documentation for the
        // contents of response.
        console.log("Successfully sent message:", response2);
        response.send(response2);
      })
      .catch(function(error) {
        console.log("Error sending message:", error);
      });
    });

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

function checkVendorApiAunthaticated(request,type)
{
  console.log("checkVendorApiAunthaticated 1");
  console.log(request.headers);
  console.log(request.headers.version);
  var version = parseInt(request.headers.version);
  console.log(version);
  var ret = false; 
  if(request.headers.securekey == secureadminkey && request.headers.client == client_key_admin)
  {
    console.log("checkVendorApiAunthaticated admin");
    ret = true;
  }
  else if(request.headers.securekey == securewebkey &&
          request.headers.version == version_value_1 && 
          request.headers.client == client_key_web)
  {
    console.log("checkVendorApiAunthaticated web pass");
    ret = true;
  }
  else if(type == 1)
  {
    console.log("checkVendorApiAunthaticated vendor");
    if(request.headers.securekey == securevendorkey &&
            request.headers.version == version_value_1 && 
            request.headers.client == client_key_vendor)
    {
      console.log("checkVendorApiAunthaticated vendor pass");
      ret = true;
    }
  }
  else if(type == 2)
  {
    console.log("checkVendorApiAunthaticated cust");
    if(request.headers.securekey == securecustomerkey &&
            request.headers.version == version_value_1 && 
            request.headers.client == client_key_customer)
    {
      console.log("checkVendorApiAunthaticated cust pass");
      ret = true;
    }
  }
  else
  {
    console.log("checkVendorApiAunthaticated not auth");
    ret = false;
  }
  return ret;
}


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