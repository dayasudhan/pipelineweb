angular.module("fileModule", [])
  .controller("fileController", function ($scope, $http, jsonFilter)
  {
    // Initialization
    $scope.fileContent = '';
    $scope.fileSize = 0;
    $scope.fileName = '';
    $scope.submit = function () {
        console.log("submit");
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
                    // var postData={coordinates:param,type:"Line",phone:"9900324201",live:"yes",
                    //               name:"Ganeshappa",size:"4 Inch",
                    //               remarks:"",
                    //               pipe_type:"PVC",
                    //               purpose:"Irrigation"};
                    //               var txt;
                    var person = prompt("Please enter customer name:", "");
                    var phone = prompt("Please enter customer phone:", "");
                    
                    if (person == null || person == "") {
                      txt = "User cancelled the prompt.";
                    } else {
                      var postData={content:aReader.result,
                       
                                  phone:phone,
                                
                                  name:person,
                                
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
                 
        }
        aReader.onerror = function (evt) {
            console.log("submit");
            $scope.fileContent = "error";
        }
      }
    }
  

  });
