var app = angular.module("app.searchList", ["ngRoute" ,"request", "oneUserModule", "privModule"]);

app.config(function ($routeProvider) {
    $routeProvider.when("/searchList/:title", {
        templateUrl: "/js/views/searchList/searchList.tpl.html",
        controller: "searchListCtrl"
    })
})

app.controller("searchListCtrl", function(requestService, $routeParams, $scope, oneUserService,privService) {
    var movieTitle = $routeParams.title;
    $scope.list = [];
    $scope.priv = privService.getpriv();
    $scope.loadData = function () {
        requestService.get().then(function (response) {
            var list = response.data.data;
            list.map(function(item) {
                item.added = false;
                return item;
            })
            for (var i = 0; i < list.length; i++) {
                var title = list[i].title.toLowerCase();
                if (title.indexOf(movieTitle) != -1) {
                    $scope.list.push(list[i]);
                }
            }
        }, function (response) {
            console.log(response.status);
        })
        oneUserService.getUser().then(function (response) {
            $scope.userFavorite = response.data.data.favorite;
            $scope.makeSure();
        });
    }
    
    $scope.makeSure = function () {
        console.log($scope.list);
        for (var i = 0; i < $scope.list.length; i++) {
            for (var j = 0; j < $scope.userFavorite.length; j++) {
                if ($scope.list[i]._id == $scope.userFavorite[j].id) {
                    $scope.list[i].added = true
                }
            }
        }
    }
})