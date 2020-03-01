angular.module("mapModule", [])
  .controller("mapController", function ($scope, $http, jsonFilter)
  {
    // Initialization
    $scope.areAllPeopleSelected = false;
     $scope.stringsArray = [];
     $scope.stringsArray2 = [[]];
     $scope.newPath = [];
     $scope.elevationPath = [];
    $scope.flightPath = null;
    $scope.index = 0;
    var currStringIndex = 0;

    $scope.getMapList = function (param) {
        console.log(param);
            console.log("getMaplist");
            var url3 = "/v1/plinemap/all";
          //  url3 = url3 + param;
            $http.get(url3)
              .success(function (data, status, headers, config)
              {
                $scope.stringsArray = data;
               console.log();
               // var data = $scope.stringsArray
            
                var length = data.length;
                var line = [];
               
                for (var i = 0; i < length; i++)
                {
                    var ar = data[i];
                     var length2 = ar.location.coordinates.length;
                     line = [];
                    for (var j = 0; j < length2; j++)
                    {
                        var  coord = new google.maps.LatLng(ar.location.coordinates[j][0],
                            ar.location.coordinates[j][1]);
                            line.push(coord);
                          
                       //   j = j + 1;
                    }
                    $scope.stringsArray2[i] = line;
                //     console.log(line);
                //  console.log($scope.stringsArray2[i]);
    
                }
                //console.log($scope.stringsArray2[0]);
                //console.log($scope.stringsArray2[1]);
                $scope.init();
                $scope.initinalizeline2($scope.stringsArray2[$scope.index]);
                
              })
              .error(function (data, status, headers, config)
              {
                $scope.simpleGetCallResult = logResult("GET ERROR", data, status, headers, config);
               
              });
          };

          $scope.getMapListPhone = function (param) {
            console.log(param);
                console.log("getMaplist");
                var url3 = "/v1/plinemap/phone/";
                url3 = url3 + param;
                $http.get(url3)
                  .success(function (data, status, headers, config)
                  {
                    $scope.stringsArray = data;
                   console.log(data);
                   // var data = $scope.stringsArray
                  
                    var length = data.length;
                    var line = [];
                    console.log(length);
                    for (var i = 0; i < length; i++)
                    {
                        var ar = data[i];
                         var length2 = ar.location.coordinates.length;
                         line = [];
                        for (var j = 0; j < length2; j++)
                        {
                            var  coord = new google.maps.LatLng(ar.location.coordinates[j][0],
                                ar.location.coordinates[j][1]);
                                line.push(coord);
                              
                           //   j = j + 1;
                        }
                        $scope.stringsArray2[i] = line;
                    //     console.log(line);
                    //  console.log($scope.stringsArray2[i]);
        
                    }
                    //console.log($scope.stringsArray2[0]);
                    //console.log($scope.stringsArray2[1]);
                    $scope.init();
                    $scope.initinalizeline2($scope.stringsArray2[$scope.index]);
                    
                  })
                  .error(function (data, status, headers, config)
                  {
                    $scope.simpleGetCallResult = logResult("GET ERROR", data, status, headers, config);
                   
                  });
              };
              $scope.getMapListPhonelive = function (param) {
                console.log(param);
                    console.log("getMaplist");
                    var url3 = "/v1/plinemap/phonelive/yes/";
                    url3 = url3 + param;
                    $http.get(url3)
                      .success(function (data, status, headers, config)
                      {
                        $scope.stringsArray = data;
                       console.log(data);
                       // var data = $scope.stringsArray
                      
                        var length = data.length;
                        var line = [];
                        console.log(length);
                        for (var i = 0; i < length; i++)
                        {
                            var ar = data[i];
                             var length2 = ar.location.coordinates.length;
                             line = [];
                            for (var j = 0; j < length2; j++)
                            {
                                var  coord = new google.maps.LatLng(ar.location.coordinates[j][0],
                                    ar.location.coordinates[j][1]);
                                    line.push(coord);
                                  
                               //   j = j + 1;
                            }
                            $scope.stringsArray2[i] = line;
                        //     console.log(line);
                        //  console.log($scope.stringsArray2[i]);
            
                        }
                        //console.log($scope.stringsArray2[0]);
                        //console.log($scope.stringsArray2[1]);
                        $scope.init();
                        $scope.initinalizeline2($scope.stringsArray2[$scope.index]);
                        
                      })
                      .error(function (data, status, headers, config)
                      {
                        $scope.simpleGetCallResult = logResult("GET ERROR", data, status, headers, config);
                       
                      });
                      
                  };
          $scope.getMapList2 = function (param) {
            console.log(param);
                console.log("getMaplist");
                var url3 = "/v1/plinemap/phonelive/yes/live";
              //  url3 = url3 + param;
                $http.get(url3)
                  .success(function (data, status, headers, config)
                  {
                    $scope.stringsArray = data;
                   console.log();
                   // var data = $scope.stringsArray
                
                    var length = data.length;
                    var line = [];
                   
                    for (var i = 0; i < length; i++)
                    {
                        var ar = data[i];
                         var length2 = ar.location.coordinates.length;
                         line = [];
                        for (var j = 0; j < length2; j++)
                        {
                            var  coord = new google.maps.LatLng(ar.location.coordinates[j][0],
                                ar.location.coordinates[j][1]);
                                line.push(coord);
                              
                              //j = j + 1;
                        }
                        $scope.stringsArray2[i] = line;
                    //     console.log(line);
                    //  console.log($scope.stringsArray2[i]);
        
                    }
                    //console.log($scope.stringsArray2[0]);
                    //console.log($scope.stringsArray2[1]);
                    $scope.init();
                    $scope.initinalizeline2($scope.stringsArray2[1]);
                    
                  })
                  .error(function (data, status, headers, config)
                  {
                    $scope.simpleGetCallResult = logResult("GET ERROR", data, status, headers, config);
                   
                  });
              };
          $scope.postMapList = function (param) {
            console.log(param);
                console.log("postMaplist");
                var url3 = "/v1/plinewithelevation/b";
                // var postData={coordinates:param,type:"Line",phone:"9900324201",live:"yes",
                //               name:"Ganeshappa",size:"4 Inch",
                //               remarks:"",
                //               pipe_type:"PVC",
                //               purpose:"Irrigation"};
                //               var txt;
                var person = prompt("Please enter customer name:", "");
                var phone = prompt("Please enter customer phone:", "");
                var size = prompt("Please enter Pipe Size :", "");
                if (person == null || person == "") {
                  txt = "User cancelled the prompt.";
                } else {
                  var postData={coordinates:param,type:"Line",
                              phone:phone,
                              live:"yes",
                              name:person,
                              size:size,
                              remarks:"",
                              pipe_type:"PVC",
                              purpose:"Irrigation"};
                              var txt;
                }
                console.log(postData);
                $http.post(url3,postData)
                .success(function (data, status, headers, config)
                {
                    console.log("success add");
                    console.log(data);
                    console.log(data.length);

                })
                .error(function (data, status, headers, config)
                {
                    console.log("errod on add");
                    console.log(status);
                    console.log(data);
                });
              };
    // Utility functions
    $scope.nextLine = function () {
      console.log("next");
       console.log($scope.stringsArray2.length);
       if($scope.index <$scope.stringsArray2.length )
          {
            $scope.index = $scope.index + 1;
            console.log($scope.index );
            $scope.initinalizeline2($scope.stringsArray2[$scope.index]);
        }
     // flightPath.setMap(map);
    }

    $scope.previousLine = function (){
      console.log("previousLine");
      if ($scope.index > 0)
      {
      $scope.index = $scope.index - 1;
      console.log($scope.index );
      $scope.initinalizeline2($scope.stringsArray2[$scope.index]);
      }
      //flightPath.setMap(null);
    }
    $scope.removeLine = function (){
      console.log("removeline");
    //  $scope.index = $scope.index - 1;
      console.log($scope.index );
      console.log($scope.stringsArray2.length)
      if ($scope.index > -1) {
        $scope.stringsArray2.splice($scope.index, 1);
      }
      console.log($scope.stringsArray2.length)
      $scope.initinalizeline2($scope.stringsArray2[$scope.index]);
      
      console.log($scope.stringsArray2.length)
      //flightPath.setMap(null);
    }
    $scope.addLine = function (){
     
        var path = flightPath.getPath();
        var path2 = flightPath2.getPath();
        var length =  path.getLength()
        var coord = [];
        for (var i = 0; i < length; i++)
        {
            var lat = path.getAt(i).lat();
            var long1 = path.getAt(i).lng();
            console.log(lat);
            console.log(long1);
            var arr1 = [lat,long1];
           // var  coord1 = new google.maps.LatLng(lat,long1);
            console.log(lat);
            coord.push(arr1);
            console.log(arr1);
        }
        console.log(coord);
        $scope.postMapList(coord);
   
    
      //flightPath.setMap(null);
    }
    $scope.allLines = function (){ 
      console.log("allLines");
      //$scope.index = $scope.index - 1;
      console.log($scope.index );
      //$scope.initinalizeline2();
      console.log($scope.index );
      console.log($scope.stringsArray2.length)
      console.log($scope.index );
      var l = $scope.stringsArray2.length;
      var line= [];
      for(i = 0; i< l; i++)
      {
        line = line.concat($scope.stringsArray2[i]);
      //  line
      }
      $scope.initinalizeline2(line);
      //flightPath.setMap(null);
    }
    
    $scope.allMultiLines = function()
    {
      $scope.initinalizeline3()     ;    
    // $scope.getMapList();     
      
    }
    $scope.initinalizeline = function()
    {
      $scope.getMapList();     
    }
    $scope.initinalizelinewithphone = function()
    {
      var phone = prompt("Please enter customer phone:", "");
      $scope.getMapListPhone(phone);     
    }
    $scope.initinalizelinewithphonelive = function()
    {
      var phone = prompt("Please enter customer phone:", "");
      $scope.getMapListPhonelive(phone);     
    }
    $scope.finalLine = function()
    {
      $scope.getMapList2();     
    }
    $scope.postLine = function()
    {
      console.log($scope.newPath);
      $scope.postMapList($scope.newPath);         
    }
    $scope.drawnewLine = function()
    {
      console.log($scope.newPath);
    
      var length2 = $scope.newPath.length;
      var line = [];
      for (var j = 0; j < length2; j++)
      {
          var  coord = new google.maps.LatLng($scope.newPath[j][0],
            $scope.newPath[j][1]);
              line.push(coord);
            
           // j = j + 1;
      }
      console.log($scope.newPath)
      $scope.initinalizeline2(line);
//$scope.newPath
    }
    $scope.onclickaddpoints = function(param)
    {
      console.log("onclickaddpoints" ,param);

          var lat = param.lat();
          var long1 = param.lng();
        
          var arr1 = [lat,long1];
         // var  coord1 = new google.maps.LatLng(lat,long1);
          console.log(lat);
          $scope.newPath.push(arr1);
          console.log( $scope.newPath);
     // }

    }
    $scope.init = function()
    {
     
     // console.log(process.env);
      DeleteMenu.prototype = new google.maps.OverlayView();

        DeleteMenu.prototype.onAdd = function() {
          var deleteMenu = this;
          var map = this.getMap();
          this.getPanes().floatPane.appendChild(this.div_);
  
          // mousedown anywhere on the map except on the menu div will close the
          // menu.
          this.divListener_ = google.maps.event.addDomListener(map.getDiv(), 'mousedown', function(e) {
            if (e.target != deleteMenu.div_) {
              deleteMenu.close();
            }
          }, true);
        };
  
        DeleteMenu.prototype.onRemove = function() {
          google.maps.event.removeListener(this.divListener_);
          this.div_.parentNode.removeChild(this.div_);
  
          // clean up
          this.set('position');
          this.set('path');
          this.set('vertex');
        };
  
        DeleteMenu.prototype.close = function() {
          this.setMap(null);
        };
  
        DeleteMenu.prototype.draw = function() {
          var position = this.get('position');
          var projection = this.getProjection();
  
          if (!position || !projection) {
            return;
          }
  
          var point = projection.fromLatLngToDivPixel(position);
          this.div_.style.top = point.y + 'px';
          this.div_.style.left = point.x + 'px';
        };
  
        /**
         * Opens the menu at a vertex of a given path.
         */
        DeleteMenu.prototype.open = function(map, path, vertex) {
          this.set('position', path.getAt(vertex));
          this.set('path', path);
          this.set('vertex', vertex);
          this.setMap(map);
          this.draw();
        };
  
        /**
         * Deletes the vertex from the path.
         */
        DeleteMenu.prototype.removeVertex = function() {
          var path = this.get('path');
          var vertex = this.get('vertex');
  
          if (!path || vertex == undefined) {
            this.close();
            return;
          }
          
          path.removeAt(vertex);
          console.log($scope.stringsArray2[$scope.index]);
          console.log("path");
         // console.log(vertex);
         // console.log(path);
          var ar = $scope.stringsArray2[$scope.index];
          console.log($scope.stringsArray2[$scope.index].length);
          ar.splice(vertex,1);
          $scope.stringsArray2[$scope.index] =ar;
          console.log("path");
          console.log($scope.stringsArray2[$scope.index].length);
         // console.log(path);
          console.log($scope.stringsArray2[$scope.index]);

          this.close();
        };
        $scope.deleteMenu = new DeleteMenu();
        function DeleteMenu() {
          this.div_ = document.createElement('div');
          this.div_.className = 'delete-menu';
          this.div_.innerHTML = 'Delete';
  
          var menu = this;
          google.maps.event.addDomListener(this.div_, 'click', function() {
            menu.removeVertex();
          });
          google.maps.event.addDomListener(this.div_, 'drag', function (event) {
         console.log('drag');
        });
      }
    }
    $scope.initinalizeline2 = function (pipelinepath) {
     console.log("initinalizeline2");
     initialize();
      //google.maps.event.addDomListener(window, 'load', null);
        var flightPath;
        var flightPath2;
        function initialize() { 
          console.log("initialize");
               var mapOptions = {
                    zoom: 15,
                    center: new google.maps.LatLng(14.1422855, 75.6774338),
                    mapTypeId: 'satellite'
                };
            var map = new google.maps.Map(document.getElementById('map'), mapOptions);
     
           
            //console.log($scope.index);
            flightPath= new google.maps.Polyline({
                path: pipelinepath,
                editable: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2,
                map: map        
            });

            
            google.maps.event.addListener(flightPath, 'rightclick', function(e) {
                  console.log('addListener');
                  if (e.vertex == undefined) {
                    return;
                  }
                  $scope.onclickaddpoints(flightPath.getPath().getAt(e.vertex));
              });
              google.maps.event.addListener(flightPath, 'click', function(e) {
                console.log('addListener');
                           if (e.vertex == undefined) {
                    return;
                  }
                  $scope.onclickaddpoints(flightPath.getPath().getAt(e.vertex));
         
                });
         
        }
         
        google.maps.event.addDomListener(window, 'load', initialize); 
        

        
       
       
    };
    $scope.initinalizeline3 = function () {
      console.log("initinalizeline3");
      initialize();
       //google.maps.event.addDomListener(window, 'load', null);
         var flightPath;
         var flightPath2;
         function initialize() { 
           console.log("initialize");
                var mapOptions = {
                     zoom: 15,
                     center: new google.maps.LatLng(14.1422855, 75.6774338),
                     mapTypeId: 'satellite'
                 };
             var map = new google.maps.Map(document.getElementById('map'), mapOptions);
      
            
             console.log($scope.index);
             console.log($scope.stringsArray2.length)
             console.log($scope.index );
             var l = $scope.stringsArray2.length;
             
             for(i = 0; i< l; i++)
             {
              
              flightPath= new google.maps.Polyline({
                 path: $scope.stringsArray2[i],
                 editable: true,
                 strokeColor: '#FF0000',
                 strokeOpacity: 1.0,
                 strokeWeight: 2,
                 map: map        
             });
           
 
             
             google.maps.event.addListener(flightPath, 'click', function(e) {
               console.log('addListener');
              //  console.log(e);
              //  console.log(e.getL));
              //  console.log(e.log);
                 // Check if click was on a vertex control point
                 if (e.vertex == undefined) {
                   return;
                 }
                 $scope.onclickaddpoints(flightPath.getPath().getAt(e.vertex));
                 //$scope.deleteMenu.open(map, flightPath.getPath(), e.vertex);
               });
              }
         }
          
         google.maps.event.addDomListener(window, 'load', initialize); 

     };

  });
