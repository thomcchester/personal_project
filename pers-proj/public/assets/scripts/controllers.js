myApp.controller('UserController', ['$scope', '$http', '$window','FactoryService' ]function($scope, $http, $window, FactoryService) {
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
    console.log($scope);
}]);
