var app = angular.module("app.addMovie", ["ngRoute", "request"]);

app.config(function ($routeProvider) {
    $routeProvider.when("/addMovie", {
        templateUrl: "/js/views/addMovie/addMovie.tpl.html",
        controller: "addMovieCtrl"
    })
});

app.controller("addMovieCtrl", function ($scope, requestService, $location) {
    $scope.newMovie = {}
    $scope.screenshot = [{}];
    $scope.genre = [{}];
    $scope.cast = [{}];

    $scope.addNewScreeshotInput = function () {
        $scope.screenshot.push({});
    }

    $scope.addNewGenresInput = function () {
        $scope.genre.push({});
    }

    $scope.addNewCastInput = function () {
        $scope.cast.push({});
    }

    $scope.submitMovie = function () {
        var screenshots = [];
        if ($scope.screenshot.length > 0) {
            for (var i = 0; i < $scope.screenshot.length; i++) {
                screenshots.push($scope.screenshot[i].value)
            }
        }
        var genres = [];

        if ($scope.genre.length > 0) {
            for (var i = 0; i < $scope.genre.length; i++) {
                genres.push($scope.genre[i].value)
            }
        }


        var casts = [];

        if ($scope.cast.length > 0) {
            for (var i = 0; i < $scope.cast.length; i++) {
                casts.push({
                    name: $scope.cast[i].name,
                    url_small_image: $scope.cast[i].url
                })
            }
        }

        var data = {
            title: $scope.newMovie.title || "",
            year: $scope.newMovie.year || "",
            mpa_rating: $scope.newMovie.mpa || "",
            runtime: $scope.newMovie.time || "",
            rating: 0,
            synopsis: $scope.newMovie.synopsis || "",
            coverImage: $scope.newMovie.cover || "",
            screenshot: screenshots,
            genres: genres,
            cast: casts,
            poster: $scope.newMovie.poster
        }
        requestService.post(data).then(function (response) {
            $location.path("/home");
        }, function (response) {
            console.log(response.status);
        })
        console.log(data);
    }
})