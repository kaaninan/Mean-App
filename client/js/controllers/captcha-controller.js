var app = angular.module('forget', ['vcRecaptcha', 'ngResource']);

app.controller('forgetController', ['$scope', '$resource', function($scope, $resource, vcRecaptchaService, $http) {

    var Captcha = $resource('/api/captcha');

    console.log("this is your app's controller");
    $scope.response = null;
    $scope.widgetId = null;

    $scope.model = {
        key: '6Le13AoUAAAAANXjenfUkzziarYKxxtBAhPtzLD_'
    };

    $scope.setResponse = function(response) {
        console.info('Response available');

        $scope.response = response;
    };

    $scope.setWidgetId = function(widgetId) {
        console.info('Created widget ID: %s', widgetId);

        $scope.widgetId = widgetId;
    };

    $scope.cbExpiration = function() {
        console.info('Captcha expired. Resetting response object');

        vcRecaptchaService.reload($scope.widgetId);

        $scope.response = null;
    };

    $scope.submit = function(response) {

        var valid;

        console.log('sending the captcha response to the server', $scope.response);

        var captcha = new Captcha();
        captcha.response = $scope.response;
        captcha.data2 = 'kaan';
        captcha.$save(function(result) {
            console.log("bitti");
            console.log(result);
        });

        // Başarısız olursa -> //     vcRecaptchaService.reload($scope.widgetId);
    };

}]);
