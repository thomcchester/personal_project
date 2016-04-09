myApp.controller('UserController', ['$scope', '$http', '$window','FactoryService', 'ngSlider' ]function($scope, $http, $window, FactoryService, $ngSlider) {
    $scope.userName;
    $scope.id;
    $scope.first_name;
    $scope.slider = {
    value: 10
  };

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
