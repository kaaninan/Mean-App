app.controller('adminController', function($rootScope, $scope, $resource, vcRecaptchaService, $http, $timeout, $window) {

    $scope.menuOgretmenActive = function(some) {
        return 'active';
    };


    $scope.deneme ="kaan";

});



// Hangi menunun active classını alacağını belirler
app.controller('menuController', function($scope) {
    $scope.menuActive = function(req){return false;}
});
