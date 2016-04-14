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
  UserService.getExType();
  $scope.thing=UserService.exty;
  $scope.priceSlider=10;
  $scope.priceSl=10;
  $scope.thing.date=UserService.d;


}]);

myApp.controller('CreateController', ['$scope','UserService', '$http', '$window', function($scope,UserService, $http, $window) {
  $scope.user;
  $scope.user=UserService;
}]);

myApp.controller('CompareController', ['$scope','UserService','GetterService','$http', '$window', function($scope,UserService,GetterService, $http, $window) {
  $scope.user;
  $scope.user=UserService;
  $scope.thing;
  GetterService.getExs();
  $scope.thing=UserService.allex;



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

    return {
        user : user,
        exty : exty,
        ext : ext,
        allex : allex,
        getExType : getExType
    };
}]);

myApp.factory("GetterService", ["$http", function($http){

    var allex={};

    var getExs = function(){
    $http.get('/getExs').then(function(response){
        console.log('getExt in factory',response.data);
        allex.asset = response.data;
        console.log(allex);
    });
    };

    return {
        allex : allex,
        getExs : getExs
    };
}]);
