var myApp = angular.module('myApp',["ngRoute"]);


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
            console.log('User Data: ', $scope.userName);
        } else {
            $window.location.href = '/index.html';
        }
    });
    $scope.user=UserService;
}]);
myApp.controller('DoExController', ['$scope','UserService', '$http', '$window', function($scope,UserService, $http, $window) {
  console.log(UserService);
}]);

myApp.controller('CreateController', ['$scope','UserService', '$http', '$window', function($scope,UserService, $http, $window) {
  $scope.user;
  $scope.user=UserService;
  console.log($scope.user);
}]);

myApp.factory("UserService", ["$http", function($http){
    var user = {};
    return {
        user : user
    };
}]);
