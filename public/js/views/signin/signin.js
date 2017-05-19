var app = angular.module("app.signin", ["ngRoute", "authModule", "tokenModule", "idModule", "privModule"]);

app.config(function ($routeProvider) {
    $routeProvider.when("/signin", {
        templateUrl: "/js/views/signin/signin.tpl.html",
        controller: "signinCtrl"
    })
})

app.controller("signinCtrl", function ($scope, authService, $location, TokenService, idService ,privService) {
    $scope.user = {};
    $scope.signin = function () {
        authService.signIn($scope.user).then(function (response) {
            TokenService.setToken(response.data.token);
            privService.setpriv(response.data.priv);
            idService.setid(response.data.id);
            $location.path('/home');
        }, function (response) {
            alert("this username or password does not exist");
        })
        $scope.user = {};
    }
})