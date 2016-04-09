angular.module('myApp', ['ngSlider']);
var myApp = angular.module('myApp',["ngRoute"]);


myApp.config(["$routeProvider", function($routeProvider){
    $routeProvider.
        when("/userHome", {
            templateUrl: "/views/partials/userHome.html",
            controller: "UserHomeController"
        }).
        when("/doExercise", {
            templateUrl: "/views/partials/doExercise.html",
            controller: "userController"
        }).
        when("/createExType", {
            templateUrl: "/views/partials/createExType.html",
            // controller: "CreateController"
        }).
        otherwise({
            redirectTo: "/userHome"
        });
}]);

myApp.controller('UserController', ['$scope', '$http', '$window', function($scope, $http, $window) {
    $scope.userName;
    $scope.id;
    $scope.first_name;

    // This happens after page load, which means it has authenticated if it was ever going to
    // NOT SECURE
    $http.get('/user').then(function(response) {
        if(response.data) {
            $scope.userName = response.data.username;
            $scope.id = response.data.id;
            $scope.first_name = response.data.first_name;
            console.log('User Data: ', $scope.userName);
        } else {
            $window.location.href = '/index.html';
        }
    });



}]);
