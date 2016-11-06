app.controller('forgetController', function($scope, $resource, vcRecaptchaService, $http, $timeout) {

    var Captcha = $resource('/api/captcha');

    $scope.response = null;
    $scope.widgetId = null;
    $scope.mail = null;

    $scope.model = {
        key: '6Le13AoUAAAAANXjenfUkzziarYKxxtBAhPtzLD_'
    };

    $scope.setResponse = function(response) {
        // console.info('Response available');
        $scope.response = response;
    };

    $scope.setWidgetId = function(widgetId) {
        // console.info('Created widget ID: %s', widgetId);
        $scope.widgetId = widgetId;
    };

    $scope.cbExpiration = function() {
        console.info('Captcha expired. Resetting response object');
        vcRecaptchaService.reload($scope.widgetId);
        $scope.response = null;
    };

    $scope.submit = function(response) {

        $scope.errorMsg = "";
        $scope.info = "";

        if ($scope.mail == null) {
            $scope.errorMsg = "Lütfen mail adresinizi girin!";
            return;
        }

        if ($scope.response == null) {
            $scope.errorMsg = "Lütfen doğrulamayı yapın!";
            return;
        }

        $scope.errorMsg = "";
        $scope.isUpload = true;
        var status = false;

        var captcha = new Captcha();
        captcha.response = $scope.response;
        captcha.$save(function(result) {
            status = result.status;

            $timeout(function() {
                $scope.isUpload = false;

                if (status == true) {
                    $scope.info = "Şifreniz mail adresinize gönderildi.";
                } else {
                    $scope.errorMsg = "Hata!";
                }
            }, 1000);
        });


        // Başarısız olursa -> //     vcRecaptchaService.reload($scope.widgetId);
    };

});
