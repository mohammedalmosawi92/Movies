var app = angular.module("app.oneMovie", ["ngRoute", "request", "convertTime", "idModule", "oneUserModule", "privModule"]);

app.config(function ($routeProvider) {
    $routeProvider.when("/movie/:id", {
        templateUrl: "/js/views/oneMovie/oneMovie.tpl.html",
        controller: "oneMovieCtrl"
    })
})

app.controller("oneMovieCtrl", function ($scope, requestService, $routeParams, idService, oneUserService, privService) {

    var id = $routeParams.id;
    $scope.userFavorite = [];
    $scope.priv = function () {
        return privService.getpriv();
    }
    $scope.userId = idService.getid();
    $scope.loadData = function () {
        requestService.getById(id).then(function (response) {
            console.log(response.data.data);
            $scope.movie = response.data.data;
            $scope.movie.added = false;
            $scope.movie.isEdit = false;
            $scope.movie.editScreen = false;
            $scope.movie.editCast = false;
            var sum = 0;
            for (var i = 0; i < $scope.movie.MyMoviesRating.length; i++) {
                sum += Number($scope.movie.MyMoviesRating[i].rate);
            }
            var average = sum / $scope.movie.MyMoviesRating.length;
            $scope.movie.averageRate = average || 0;
        }, function (response) {
            console.log(response.status);
        });
        oneUserService.getUser().then(function (response) {
            $scope.userFavorite = response.data.data.favorite;
            $scope.makeSure();
        });
    };

    //to make sure movie doesn't exsit in user list
    $scope.makeSure = function () {
        for (var i = 0; i < $scope.userFavorite.length; i++) {
            if ($scope.movie._id == $scope.userFavorite[i].id) {
                $scope.movie.added = true
            }
        }
    }

    //add review
    $scope.addReview = function () {
        var data = {
            myReview: $scope.review,
            id: $scope.userId
        }
        console.log(data);
        requestService.postReview(id, data).then($scope.loadData);
        $scope.review = "";
    };

    //delete review
    $scope.delReview = function (index) {
        requestService.delReview(id, index).then($scope.loadData);
    }

    //delete Movie
    $scope.deleteMovie = function (id) {
        requestService.del(id).then();
    }

    //edit Movie
    $scope.editMovie = function () {
        $scope.movie.isEdit = !$scope.movie.isEdit;
    }

    //save Movie
    $scope.saveMovie = function (id, genres) {

        if (Array.isArray(genres)) {
            var genre = genres;
        } else {
            var genre = genres.split(",");
        }
        var data = {
            title: $scope.movie.title,
            genres: genre,
            year: $scope.movie.year,
            coverImage: $scope.movie.coverImage
        }
        requestService.put(id, data).then(function (response) {
            $scope.loadData();
            $scope.movie.isEdit = !$scope.movie.isEdit;
        });
    }

    //edit Movie Screenshot
    $scope.editScreen = function () {
        $scope.movie.editScreen = !$scope.movie.editScreen;
    }
    
    //save Movie sceeenshot edit
    $scope.saveScreen = function (id, screenshots) {
        var data = {
            screenshot: screenshots,
        }
        requestService.put(id, data).then();
        $scope.movie.editScreen = !$scope.movie.editScreen;
    }
    
    $scope.editCast = function () {
        console.log("ffff")
        $scope.movie.editCast = !$scope.movie.editCast;
    }
    
    $scope.saveCast = function (id, casts) {
        var data = {
            cast: casts,
        }
        requestService.updateCast(id, data);
        $scope.movie.editCast = !$scope.movie.editCast;
    }
})