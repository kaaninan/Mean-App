app.controller('loginController', function($scope, $resource, $window) {

    var Auth = $resource('/api/login');

    $scope.submit = function(response) {

        $scope.uyari = "";
        $scope.bilgi = "";

        if ($scope.user == null || $scope.pass == null) {
            $scope.uyari = "Lütfen kullanıcı adınızı ve şifrenizi girin!";
            return;
        }

        var auth = new Auth();
        auth.username = $scope.user;
        auth.password = $scope.pass;

        auth.$save(function(result) {
            if (result.login == "true") {
                if (result.user.type == "admin") {
                    $window.location.replace('/admin');
                } else if (result.user.type == "ogretmen") {
                    $window.location.replace('/ogretmen');
                } else if (result.user.type == "ogrenci") {
                    $window.location.replace('/ogrenci');
                }
            } else {
                $scope.uyari = "Yanlış kullanıcı adı veya şifre!";
                $scope.user = "";
                $scope.pass = "";
            }
        });

    };

});
