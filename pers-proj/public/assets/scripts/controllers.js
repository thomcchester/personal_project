myApp.controller('UserHomeController',  ['$scope', '$http', '$window','FactoryService','UserService'],function($scope, $http, $window, FactoryService, UserService) {
    $scope.userName;
    $scope.id;
    $scope.first_name;


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
)};
