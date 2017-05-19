var app = angular.module("app.advanceSearch", ["ngRoute", "request", "oneUserModule", "privModule"]);

app.config(function ($routeProvider) {
    $routeProvider.when("/advanceSearch/", {
        templateUrl: "/js/views/advanceSearch/advanceSearch.tpl.html",
        controller: "advanceSearchCtrl"
    })
})

app.controller("advanceSearchCtrl", function (requestService, $scope, oneUserService, privService) {
    $scope.moviesNum = 10;
    $scope.searchInput = "";
    $scope.searchType = "title";
    $scope.list = [];
    $scope.sortType = "title";
    $scope.priv = privService.getpriv();
    $scope.loadData = function () {
        requestService.get().then(function (response) {
            $scope.list = response.data.data;
            $scope.list.map(function (item) {
                item.added = false;
                return item;
            })
        }, function (response) {
            console.log(response.status);
        })

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
    
    $scope.advanceSearch = function () {
        $scope.list = [];
        requestService.get().then(function (response) {
            var movie = response.data.data;
            for (var i = 0; i < movie.length; i++) {
                if ($scope.searchType == "title") {
                    $scope.searchInput = $scope.searchInput.toLowerCase();
                    var title = movie[i][$scope.searchType].toLowerCase();
                    if (title.indexOf($scope.searchInput) != -1) {
                        $scope.list.push(movie[i]);
                    }
                } else {
                    if (movie[i][$scope.searchType] == $scope.searchInput) {
                        $scope.list.push(movie[i]);
                    }
                }
            }
        }, function (response) {
            console.log(response.status);
        })
    }

    $scope.showMoreMovies = function () {
        $scope.moviesNum += 10;
    }
})