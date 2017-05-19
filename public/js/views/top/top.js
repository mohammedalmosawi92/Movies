var app = angular.module("app.top", ["ngRoute", "request", "oneUserModule", "privModule"]);
app.config(function ($routeProvider) {
    $routeProvider.when("/topMovies", {
        templateUrl: "/js/views/top/top.tpl.html",
        controller: "topCtrl"
    })
})

app.controller("topCtrl", function ($scope, requestService, oneUserService, privService) {
    
    $scope.list = [];
    $scope.userSort = "rating";
    $scope.sortType = true;
    $scope.priv = privService.getpriv();
    
    $scope.loadData = function () {
        requestService.get().then(function (response) {
            $scope.list = response.data.data;
            $scope.list.map(function(item) {
                item.added = false;
                return item;
            });
            for(var i = 0; i < $scope.list.length; i++) {
                var sum = 0;
                for(var j = 0; j < $scope.list[i].MyMoviesRating.length; j++) {
                    sum += Number($scope.list[i].MyMoviesRating[j].rate);
                }
                var average = sum / $scope.list[i].MyMoviesRating.length;
                $scope.list[i].averageRate = average || 0;
            }
        }, function (response) {
            console.log(response.status);
        })
        oneUserService.getUser().then(function (response) {
            $scope.userFavorite = response.data.data.favorite;
            $scope.makeSure();
        });
    }
    
    //to check if this movie already exists in user list
    $scope.makeSure = function () {
        for (var i = 0; i < $scope.list.length; i++) {
            for (var j = 0; j < $scope.userFavorite.length; j++) {
                if ($scope.list[i]._id == $scope.userFavorite[j].id) {
                    $scope.list[i].added = true
                }
            }
        }
    }
    
    //SORT MOVIES
    //sort by title
    $scope.sortByTitle = function() {
        $scope.userSort = "title";
        $scope.sortType = !$scope.sortType;
    }
    
    //sort by imdb rate
    $scope.sortByIMDBRate = function() {
        $scope.userSort = "rating";
        $scope.sortType = !$scope.sortType
    }
    
    //sort by mm rate
    $scope.sortByMMRate = function() {
        $scope.userSort = "averageRate";
        $scope.sortType = !$scope.sortType
    }
    
    //sort by year
    $scope.sortByYear = function() {
        $scope.userSort = "year";
        $scope.sortType = !$scope.sortType
    }
    
    //delete Movie
    $scope.deleteMovie = function(id) {
        requestService.del(id).then($scope.loadData);
    }

})