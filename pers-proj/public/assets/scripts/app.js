var myApp = angular.module('myApp',['ngRoute','rzModule']);


myApp.config(["$routeProvider", function($routeProvider){
    $routeProvider.
        when("/userHome", {
            templateUrl: "/views/partials/userHome.html",
            controller: "UserController"
        }).
        when("/doExercise", {
            templateUrl: "/views/partials/doExercise.html",
            controller: "DoExController"
        }).
        when("/createExType", {
            templateUrl: "/views/partials/createExType.html",
            controller: "CreateController"
        }).
        when("/compareEx", {
            templateUrl: "/views/partials/compareEx.html",
            controller: "CompareController"
        }).

        otherwise({
            redirectTo: "/userHome"
        });
}]);

myApp.controller('UserController', ['$scope','UserService', '$http', '$window', function($scope,UserService, $http, $window) {
    $scope.userName;
    $scope.id;
    $scope.first_name;
    UserService.user.userName;
    UserService.user.id;
    UserService.user.first_name;

    // This happens after page load, which means it has authenticated if it was ever going to
    // NOT SECURE
    $http.get('/user').then(function(response) {
        if(response.data) {
            UserService.user.userName = response.data.username;
            UserService.user.id = response.data.id;
            UserService.user.first_name = response.data.first_name;
            $scope.userName=response.data.username;
            $scope.id=response.data.id;
            $scope.first_name=response.data.first_name;
        } else {
            $window.location.href = '/index.html';
        }
    });
}]);
myApp.controller('DoExController', ['$scope','UserService', '$http', '$window', function($scope,UserService, $http, $window) {
  $scope.user;
  $scope.user=UserService;
  $scope.thing;
  $scope.date;
  $scope.doerate={};
  UserService.getExType();
  $scope.thing=UserService.exty;
  $scope.priceSlider=10;
  $scope.priceSl=10;
  $scope.submitForm = function(){
    $scope.doerate.pain=$scope.priceSlider;
    $scope.doerate.quality=$scope.priceSl;
    $scope.doerate.date=Date();
    UserService.createFunctionDo($scope.doerate);

    console.log($scope.doerate)
  }


}]);

myApp.controller('CreateController', ['$scope','UserService', '$http', '$window', function($scope,UserService, $http, $window) {
  $scope.allerate={};
  $scope.user;
  $scope.user=UserService;
  $scope.submitForm = function(){
    $scope.allerate.user = $scope.user.user.userName;
    UserService.createFunction($scope.allerate);
  }
}]);

myApp.controller('CompareController', ['$scope','UserService','GetterService','$http', '$window', function($scope,UserService,GetterService, $http, $window) {
  $scope.user;
  $scope.user=UserService;
  $scope.thing;
  $scope.hold;
  GetterService.getExs();
  $scope.thing=GetterService.allex;
  $scope.toggle = false;
  $scope.submitForm = function(){
    $scope.hold=Object.keys($scope.thing.asset)[0]
  }



}]);


myApp.factory("UserService", ["$http", function($http){
    var user = {};
    var exty={};
    var ext={};
    var allex={};
    var d={};

    var getExType = function(){
    $http.get('/createExType').then(function(response){
        console.log('getExt in factory',response.data);
        exty.asset = response.data;
        exty.date=Date()
        console.log(exty)
    });
    };
    var createFunction = function(data){
      $http.post('/createExType', data).then(function(request){
    //posts to SQL database, but idk why it is sending full html page
    });
  };

  var createFunctionDo = function(data){
    $http.post('/doExercise', data).then(function(request){
  //posts to SQL database, but idk why it is sending full html page
  });
};

    return {
        user : user,
        exty : exty,
        ext : ext,
        allex : allex,
        createFunction : createFunction,
        createFunctionDo : createFunctionDo,
        getExType : getExType

    };
}]);

myApp.factory("GetterService", ["$http", function($http){

    var allex={};

    var getExs = function(){
    $http.get('/getExs').then(function(response){
        console.log('getExt in factory',response.data);
        allex.asset = response.data;
        allex.len=Object.keys(allex.asset).length
        allex.asset = _.groupBy(allex.asset, "exercise");
        console.log(Object.keys(allex.asset)[0]);


    });
    };

    return {
        allex : allex,
        getExs : getExs
    };
}]);
