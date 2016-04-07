var myApp = angular.module("myApp", ["ngRoute"]);

myApp.config(["$routeProvider", function($routeProvider){
    $routeProvider.
        when("/add", {
            templateUrl: "/views/routes/add.html",
            controller: "AddController"
        }).
        when("/view", {
            templateUrl: "/views/routes/view.html",
            controller: "ShowController"
        }).
        otherwise({
            redirectTo: "/add"
        });
}]);

myApp.controller('UserController', ['$scope', '$http', '$window', function($scope, $http, $window) {
    $scope.userName;

    // This happens after page load, which means it has authenticated if it was ever going to
    // NOT SECURE
    $http.get('/user').then(function(response) {
        if(response.data) {
            $scope.userName = response.data.username;
            console.log('User Data: ', $scope.userName);
        } else {
            $window.location.href = '/index.html';
        }
    });
}]);
