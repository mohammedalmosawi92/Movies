var app = angular.module("app.screenshot", ["ngRoute", "request", "oneUserModule", "privModule"]);

app.config(function ($routeProvider) {
    $routeProvider.when("/screenshot/:id", {
        templateUrl: "/js/views/screenshot/screenshot.tpl.html",
        controller: "screenshotCtrl"
    })
});

app.controller("screenshotCtrl", function ($scope, requestService, $routeParams, oneUserService, privService) {
    var id = $routeParams.id;

    var priv = function () {
        return privService.getpriv();
    };

    $scope.edit = [];
    $scope.loadData = function () {
        requestService.getById(id).then(function (response) {
            $scope.movie = response.data.data;
            $scope.movie.isEdit = false;
            for (var i = 0; i < $scope.movie.screenshot.length; i++) {
                $scope.edit[i] = false;
            }
        }, function (response) {
            console.log(response.status);
        });
    };

    $scope.deleteScreen = function (index) {
        requestService.delScreenshot($scope.movie._id, index).then($scope.loadData);
    }

    $scope.updateScreen = function (index) {
        $scope.edit[index] = !$scope.edit[index];
    };

    $scope.saveScreen = function (index, url) {
        var data = {
            url: url
        }
        $scope.edit[index] = !$scope.edit[index];
        requestService.updateScreen($scope.movie._id, index, data).then($scope.loadData);
    };

    $scope.addScreen = function () {
        var data = {
            url: $scope.newScreen
        }
        requestService.addScreen($scope.movie._id, data).then($scope.loadData);
    }
})