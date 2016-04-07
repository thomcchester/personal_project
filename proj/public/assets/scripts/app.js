var myApp = angular.module('myApp', ["ngRoute"]);

myApp.config(["$routeProvider", function($routeProvider){
    $routeProvider.
        when("/addExType", {
            templateUrl: "/views/partials/addExType.html",
            controller: "AddController"
        }).
        when("/addEx", {
            templateUrl: "/views/partials/addEx.html",
            controller: "ShowController"
        }).
        otherwise({
            redirectTo: "/addEx"
        });
}]);

myApp.controller('UserController', ['$scope', '$http', '$window', function($scope, $http, $window) {

}]);
