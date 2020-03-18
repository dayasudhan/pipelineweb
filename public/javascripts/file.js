angular.module("fileModule", [])
  .controller("fileController", function ($scope, $http, jsonFilter)
  {
    // Initialization
    $scope.fileContent = '';
    $scope.fileSize = 0;
    $scope.fileName = '';
    $scope.live = 'No';
    $scope.type = 'PVC';
    $scope.size = '3 Inch';
    $scope.purpose = 'Irrigation';
    $scope.paid = 0;
    $scope.vendor= "Dayasudhan";
    $scope.submit = function () {
        console.log("submit");
        console.log($scope.name);
        console.log($scope.phone);
        console.log($scope.file);
      var file = document.getElementById("myFileInput").files[0];
      if (file) {
        console.log("submit");
        //console.log(file);
        var aReader = new FileReader();
        console.log("submit");
        aReader.readAsText(file, "UTF-8");
        aReader.onload = function (evt) {
            console.log("submit");
            console.log( aReader.result);
            $scope.fileContent = aReader.result;
            $scope.fileName = document.getElementById("myFileInput").files[0].name;
            $scope.fileSize = document.getElementById("myFileInput").files[0].size;;

           
               
                    console.log("postMaplist");
                    var url3 = "/v1/gpxdatatojson";
                    var postData={content:aReader.result,
                                  phone:$scope.phone,
                                  name:$scope.name,
                                  live:$scope.live,                               
                                  size:$scope.size ,
                                  pipe_type:$scope.type,
                                  remarks:$scope.remarks,
                                  purpose:$scope.purpose,
                                  paid:$scope.paid,
                                  vendorusername:$scope.vendor};
        
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
                 
        }
        aReader.onerror = function (evt) {
            console.log("submit");
            $scope.fileContent = "error";
        }
      }
    }
    $scope.submitWaypoints = function () {
      console.log("submitWaypoints");
      console.log($scope.name);
      console.log($scope.phone);
      console.log($scope.file);
    var file = document.getElementById("myFileWayPointInput").files[0];
    if (file) {
      console.log("submitWaypoints");
      //console.log(file);
      var aReader = new FileReader();
      console.log("submitWaypoints");
      aReader.readAsText(file, "UTF-8");
      aReader.onload = function (evt) {
          console.log("submitWaypoints");
          console.log( aReader.result);
          $scope.fileContent = aReader.result;
          $scope.fileName = document.getElementById("myFileWayPointInput").files[0].name;
          $scope.fileSize = document.getElementById("myFileWayPointInput").files[0].size;;

         
             
                  console.log("postMaplist");
                  var url3 = "/v1/gpxwaypointstojson";
                  var postData={content:aReader.result,
                     
                                phone:$scope.phone,
                              
                                name:$scope.name,
                              
                                pipe_type:"PVC",
                                purpose:"Irrigation"};
      
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
               
      }
      aReader.onerror = function (evt) {
          console.log("submitWaypoints");
          $scope.fileContent = "error";
      }
    }
  }
  });
