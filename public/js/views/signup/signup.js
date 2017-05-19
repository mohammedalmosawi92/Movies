var app = angular.module("app.signup", ["ngRoute", "authModule"]);
app.config(function ($routeProvider) {
    $routeProvider.when("/signup", {
        templateUrl: "/js/views/signup/signup.tpl.html",
        controller: "signupCtrl"
    })
})

app.controller("signupCtrl", function ($scope, authService, $location) {
    $scope.user = {};
    $scope.signup = function () {
        if ($scope.user.password != $scope.user.passwordConfirm) {
            $scope.dontMatch = true;
        } else {
            var data = {
                username: $scope.user.username,
                password: $scope.user.password,
                favorite: []
            }
            authService.signUp(data).then(function (response) {
                $location.path("/signin");
                $scope.dontMatch = false;
                $scope.user = {};
            }, function (response) {
                alert("This username already exists");
            })
        }
    }
})