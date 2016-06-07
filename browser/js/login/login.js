app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: '/js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state) {

    $scope.login = {};
    $scope.signup = {};
    $scope.error = null;


    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function () {
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };
    /*
    unauthenticated users signs up with login info, use AuthService.signup method (which we created)
    to make an http.post request on the /signup URI path
    */
    $scope.sendSignup = function(signupInfo){ 
        $scope.error = null;
        AuthService.signup(signupInfo).then(function(){
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid signup credentials.';
        });
    };
});