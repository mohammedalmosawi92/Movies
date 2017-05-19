var app = angular.module("app.addMovieState", ["ngRoute", "request", "addMovieModule", "oneUserModule"]);

app.config(function ($routeProvider) {
    $routeProvider.when("/addMovieState/:id", {
        templateUrl: "/js/views/addMovieState/addMovieState.tpl.html",
        controller: "addMovieStateeCtrl"
    })
});

app.controller("addMovieStateeCtrl", function ($scope, $routeParams, requestService, addMovieService, oneUserService) {

    var id = $routeParams.id;
    $scope.selectList = "Watched";
    $scope.userId = "";
    $scope.MovieDate = new Date();
    $scope.loadData = function () {
        requestService.getById(id).then(function (response) {
            $scope.movie = response.data.data;
        }, function (response) {
            console.log(response.status);
        });
        oneUserService.getUser().then(function (response) {
            $scope.userId = response.data.data._id;
        }, function (response) {
            console.log(response.status);
        })
    }

    $scope.add = function () {
        if ($scope.selectList == "Watched") {
            var data = {
                id: id,
                status: $scope.selectList,
                title: $scope.movie.title,
                date: $scope.MovieDate,
                rate: $scope.rateMovie,
                comment: $scope.movieComment || ""
            }
        } else {
            var data = {
                id: id,
                status: $scope.selectList,
                title: $scope.movie.title,
            }
        }
        var rateData = {
            userId: $scope.userId,
            rate: $scope.rateMovie
        }
        requestService.rate(id,rateData).then(function(response) {
        }, function(response) {
            console.log(response.status);
        });
        addMovieService.add(data).then(function (response) {}, function (response) {
            console.log(response.status);
        })
    }
})