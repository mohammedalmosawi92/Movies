var app = angular.module("app.cast", ["ngRoute", "request", "oneUserModule", "privModule"]);

app.config(function ($routeProvider) {
    $routeProvider.when("/cast/:id", {
        templateUrl: "/js/views/cast/cast.tpl.html",
        controller: "castCtrl"
    })
});

app.controller("castCtrl", function($scope, requestService, $routeParams, oneUserService, privService) {
    var id = $routeParams.id;
    var priv = function() {
        return privService.getpriv();
    }
    $scope.edit = [];
    $scope.loadData = function () {
        requestService.getById(id).then(function (response) {
            $scope.movie = response.data.data;
            $scope.movie.isEdit = false;
            for (var i = 0; i < $scope.movie.cast.length; i++) {
                $scope.edit[i] = false;
            }
        }, function (response) {
            console.log(response.status);
        });
    };
})