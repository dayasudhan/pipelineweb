app = angular.module("vendorModule", []);

  app.controller("mainController", function ($scope, $http, jsonFilter)
  {
  		 $scope.total2 = 123;

  	  $scope.getOrders = function (param) {
      console.log("getOrders");
      var url = "/v1/vendor/order/";
      url = url + param;
      $http.get(url)
        .success(function (data, status, headers, config)
        {
          $scope.orderlist = data;
          $scope.total2 = data.length;
          angular.forEach($scope.orderlist, function(item) {
          var timestamp = item._id.toString().substring(0,8);
          item.date = new Date( parseInt( timestamp, 16 ) * 1000 );
          item.statusArrayList =[
                      { id: 1, name: 'ORDERED',disabled:true},
                      { id: 2, name: 'ACCEPTED', disabled: false },
                      { id: 3, name: 'DELIVERED', disabled: false },
                      { id: 4, name: 'CANCELLLED', disabled: false },
                      { id: 5, name: 'REJECTED', disabled: false }
                  ];
          item.DisabledStatus = [];          
          angular.forEach(item.tracker,function(st)
          {           
            item.DisabledStatus.push(st.status);
          });
        });
          $scope.getOrderSummary(param);
          // $scope.getMenuList(param);
        })
        .error(function (data, status, headers, config)
        {
          $scope.simpleGetCallResult = logResult("GET ERROR", data, status, headers, config);
        });
    };
$scope.trackerUpdateStatus = function(param1)
{
    console.log("trackerUpdateStatus");
    console.log(this.selectedStatus);
    console.log(param1);
   
    var url = "/v1/vendor/order/status/";
    url = url + param1;
    var postData={status:this.selectedStatus,reason:'ok'};
    $http.put(url,postData)
    .success(function (data, status, headers, config)
    {
    console.log("success put");
    console.log(data);
    })
    .error(function (data, status, headers, config)
    {
   // getMenuList(param);
    console.log("errod on put");
    console.log(status);
    console.log(data);
    });
};

    $scope.getOrderSummary = function (param) {
      console.log("getOrdersummary");
      var url2 = "/v1/vendor/order/summary/";
      url2 = url2 + param;
      $http.get(url2)
        .success(function (data, status, headers, config)
        {
          $scope.orderSummarylist = data;
          
        })
        .error(function (data, status, headers, config)
        {
          $scope.simpleGetCallResult = logResult("GET ERROR", data, status, headers, config);
        });
    };

   
  });

  app.controller("menuController", function ($scope, $http, jsonFilter)
  {
     $scope.selection = [];
   // toggle selection for a given fruit by name
    $scope.toggleSelection = function (tobedeletedMenulist) {
      console.log("toggleSelection 1");
      console.log(tobedeletedMenulist);
      console.log($scope.selection);
      var idx = $scope.selection.indexOf(tobedeletedMenulist);

      // is currently selected
      if (idx > -1) {
        console.log("toggleSelection 2");
        $scope.selection.splice(idx, 1);
      }

      // is newly selected
      else {
        console.log("toggleSelection 3");
        $scope.selection.push(tobedeletedMenulist);
      }
    };

 $scope.getMenuList = function (param) {
  console.log(param);
      console.log("getmenulist");
      var url3 = "/v1/vendor/menu/";
      url3 = url3 + param;
      $http.get(url3)
        .success(function (data, status, headers, config)
        {
          $scope.menuList = data;
          
        })
        .error(function (data, status, headers, config)
        {
          $scope.simpleGetCallResult = logResult("GET ERROR", data, status, headers, config);
        });
    };
    $scope.deleteMenu = function (param,foodmenu) {
      console.log("deleteMenu");
       console.log(param);
       console.log(foodmenu);
      var url4 = "/v1/vendor/update/community/";
      url4 = url4 + param + "/" + foodmenu.name;
      $http.delete(url4,$scope.selection)
        .success(function (data, status, headers, config)
        {
           console.log("success add");
           console.log(data);
        })
        .error(function (data, status, headers, config)
        {
           getMenuList(param);
          console.log("errod on add");
          console.log(status);
          console.log(data);
        });
         $scope.getMenuList(param);
    };
    $scope.addMenu = function (param) {
      console.log("addMenu");
       console.log( $scope.fooditem);
      var url4 = "/v1/vendor/menu";
    //  url4 = url4 + param;
      var postData={fooditem:$scope.fooditem,
    		  foodprice:$scope.foodprice,
          description:$scope.fooddescription,
          logo:$scope.foodItemlogo,
       		timings:$scope.timings};

      $http.post(url4,postData)
        .success(function (data, status, headers, config)
        {
           console.log("success add");
           console.log(data);
        })
        .error(function (data, status, headers, config)
        {
           getMenuList(param);
          console.log("errod on add");
          console.log(status);
          console.log(data);
        });
         $scope.getMenuList(param);
    };
  });
  app.controller("DetailsController", function ($scope, $http, jsonFilter)
  {
      $scope.addLogo = function (param,files) {
      console.log("addLogo");
      var fd = new FormData();
      console.log(files[0]);
      console.log($scope.hotelId);
    //Take the first selected file
      fd.append("file", files[0]);
      
      var url4 = "/v1/vendor/logo/";
      url4 = url4 + $scope.hotelId;
      $http.post(url4, fd, {
        withCredentials: true,
        headers: {'Content-Type': undefined , 'enctype': 'multipart/form-data' },
        transformRequest: angular.identity
    }).success(function (data, status, headers, config)
        {
            console.log("addLogo success");
        })
        .error(function (data, status, headers, config)
        {
          console.log("addLogo error");
        });
         
    };


      $scope.addVendorDetails = function (param) {
      console.log("addVendorDetails 1");
      console.log("deliverAreas",deliverAreas);


      var url = "/v1/vendor/info/";
      url = url + param;
      var postData={
        name:$scope.vendorname, 
        email:$scope.vendoremail, 
        phone:$scope.vendorphone,
        username: param, 
        address1:$scope.vendorAddress1,
       
        address2:$scope.vendorAddress2, 
        street :$scope.vendorStreet,
        landmark:$scope.vendorLandmark, 
        areaname:$scope.vendorAreaname, 
        city:$scope.vendorcity, 
        zip:$scope.vendorzip,
        latitude:$scope.latitude, 
        longitude:$scope.longitude

       };

      $http.post(url,postData)
        .success(function (data, status, headers, config)
        {
            console.log("addDetails success");
            alert("addDetails success");

        })
        .error(function (data, status, headers, config)
        {
          console.log("addDetails error");
           alert("addDetails error");
        });
    };

      $scope.getDetails = function (param) {
      console.log("getDetails");
      console.log(param);
      $scope.getCityCoverage();
      var url = "/v1/vendor/info/";

      url = url + param;
      // var postData={Name:$scope.hotelName, username: param, Address1:$scope.hotelAddress1, phone:$scope.hotelphone,
      //   Address2:"", street :"",Landmark:$scope.hotelLandmark, Areaname:$scope.hotelAreaname, 
      //   City:$scope.hotelcity, zip:$scope.hotelzip,latitude:$scope.latitude, longitude:$scope.longitude, logo:"",
      //    vegornonveg:$scope.vegornonveg, speciality: $scope.speciality , deliverrange:$scope.deliverrange,deliverareas:$scope.deliverareas};
      $http.get(url)
        .success(function (data, status, headers, config)
        {
            console.log("getDetails success");
            console.log(data[0]);
             $scope.hotelName = data[0].hotel.name;
             $scope.hotelId = data[0].hotel.id;
             $scope.hotelAddress1 =data[0].address.addressLine1;
             $scope.hotelphone =data[0].phone;
            $scope.hotelLandmark =data[0].address.LandMark;
            $scope.hotelAreaname =data[0].address.areaName;
            $scope.hotelcity =data[0].address.city;
            $scope.hotelzip =data[0].address.zip;
            $scope.latitude =data[0].address.latitude;
            $scope.longitude =data[0].address.longitude;
          //  $scope.vegornonveg =data[0].
            $scope.speciality =data[0].speciality;
            $scope.deliverRange =data[0].deliverRange;
            $scope.deliverareas =data[0].deliverAreas;
            $scope.minimumOrder =data[0].minimumOrder;
            $scope.deliverCharge = data[0].deliverCharge;
            $scope.deliveryTime = data[0].deliveryTime;

            $scope.isBulkVendor = data[0].isBulkVendor;
            $scope.bulkdeliverCharge = data[0].bulkdeliverCharge;
            $scope.bulkdeliverRange = data[0].bulkdeliverRange;
            $scope.bulkminimumOrder = data[0].bulkminimumOrder;
            $scope.bulkdeliveryTime

        })
        .error(function (data, status, headers, config)
        {
          console.log("getDetails error");
        });

    };

    $scope.getCityCoverage = function(){
      console.log("getCityCoverage");
      var url = "/v1/admin/coverageArea";
      $http.get(url)
        .success(function (data, status, headers, config)
        {
          console.log("response");
          console.log(data);
          
          var cityCoverage =  [];
          var objCity = [];
          angular.forEach(data, function(city) {
            var obj = new Object();
            var obj2 = new Object();
            obj2 = city.cityName;
             var subAreaCoverage =  [];
             //var bulksubAreaCoverage =  [];
             angular.forEach(city.subAreas, function(area) {
               // if(area.isBulkAreaOnly == null || area.isBulkAreaOnly == 0)
               // {
               //       subAreaCoverage.push(area.name);
               // }
               // else
               // {
               //      bulksubAreaCoverage.push(area.name);
               // }
               subAreaCoverage.push(area.name);
             });

             obj.subAreas = subAreaCoverage;
             //obj.bulkSubAreas = bulksubAreaCoverage;
             console.log("subAreas" ,subAreaCoverage);
             // console.log("bulksubAreaCoverage" ,bulksubAreaCoverage);
             cityCoverage.push(obj);
              objCity.push(obj2)
          });
           console.log("sngulr");
           cityCoverage.citys = objCity;
           $scope.cityCoverage = cityCoverage;
           $scope.selectedCity = 0;
           $scope.hotelcity = $scope.cityCoverage[$scope.selectedCity];
      console.log($scope.cityCoverage);
        })
        .error(function (data, status, headers, config)
        {
          $scope.simpleGetCallResult = logResult("GET ERROR", data, status, headers, config);
        });
    };

  });


