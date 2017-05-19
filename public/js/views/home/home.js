var app = angular.module("app.home", ["ngRoute", "request", "convertTime", "addMovieModule", "oneUserModule", "privModule"]);

app.config(function ($routeProvider) {
    $routeProvider.when("/home", {
        templateUrl: "/js/views/home/home.tpl.html",
        controller: "homeCtrl"
    })
});

app.controller("homeCtrl", function ($scope, requestService, addMovieService, oneUserService, privService) {
    $scope.userFavorite = [];
    $scope.numOfMovies = 10;
    
    $scope.priv = function() {
        return privService.getpriv();
    }
    $scope.loadData = function () {
        $scope.list = [];
        requestService.get().then(function (response) {
            $scope.list = response.data.data;
            $scope.list.map(function (item) {
                item.added = false;
                return item;
            })
            for (var i = 0; i < $scope.list.length; i++) {
                var sum = 0;
                var num = 0;
                for (var j = 0; j < $scope.list[i].MyMoviesRating.length; j++) {
                    if($scope.list[i].MyMoviesRating[j].rate != undefined && $scope.list[i].MyMoviesRating[j].rate != null) {
                        sum += Number($scope.list[i].MyMoviesRating[j].rate);
                        num++
                    }
                    
                }
                var average = sum / num
                $scope.list[i].averageRate = average || 0;
            }
        }, function (response) {
            console.log(response.status);
        });
        oneUserService.getUser().then(function (response) {
            $scope.userFavorite = response.data.data.favorite;
            $scope.makeSure();
        });
    }

    $scope.makeSure = function () {
        for (var i = 0; i < $scope.list.length; i++) {
            for (var j = 0; j < $scope.userFavorite.length; j++) {
                if ($scope.list[i]._id == $scope.userFavorite[j].id) {
                    $scope.list[i].added = true
                }
            }
        }
    }
    $scope.showMore = function () {
        console.log($scope.list);
        $scope.numOfMovies += 10;
    }

    $scope.addMovie = function (id) {
        var data = {
            id: id
        };
        addMovieService.add(data).then(function (response) {

        }, function (response) {
            console.log(response.status);
        })
    }
    
    //delete Movie
    $scope.deleteMovie = function(id) {
        requestService.del(id).then($scope.loadData);
    }
})