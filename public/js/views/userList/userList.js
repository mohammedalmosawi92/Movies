var app = angular.module("app.userList", ["ngRoute", "request", "oneUserModule", "privModule"]);

app.config(function ($routeProvider) {
    $routeProvider.when("/userList/:id", {
        templateUrl: "/js/views/userList/userList.tpl.html",
        controller: "userListCtrl"
    })
});

app.controller("userListCtrl", function ($scope, requestService, $routeParams, oneUserService, privService) {
    var id = $routeParams.id;
    var priv = function () {
        return privService.getpriv();
    }
    $scope.loadData = function () {
        oneUserService.getUserById(id).then(function (response) {
            $scope.user = response.data.data;
            console.log($scope.user);
        }, function (response) {
            console.log(response.status);
        });
    };
})