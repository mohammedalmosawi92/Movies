var app = angular.module("app.myList", ["ngRoute", "request", "request", "oneUserModule", "addMovieModule"]);


app.config(function ($routeProvider) {
    $routeProvider.when("/myList", {
        templateUrl: "/js/views/myList/myList.tpl.html",
        controller: "myListCtrl"
    });
});

app.controller("myListCtrl", function ($scope, requestService, oneUserService, addMovieService) {

    $scope.loadData = function () {
        $scope.userId = "";
        $scope.list = [];
        $scope.watched = [];
        $scope.plan = [];
        oneUserService.getUser().then(function (response) {
            $scope.list = response.data.data.favorite;
            $scope.list.map(function (item) {
                item.isEdit = false;
                return item;
            })
            for (var i = 0; i < $scope.list.length; i++) {
                if ($scope.list[i].status === "Watched") {
                    $scope.watched.push($scope.list[i]);
                } else {
                    $scope.plan.push($scope.list[i]);
                }
            }
        });
        oneUserService.getUser().then(function (response) {
            $scope.userId = response.data.data._id;
        })
    }

    //show edit in watch list
    $scope.editWatch = function (index) {
        $scope.watchedStatus = !$scope.watchedStatus;
        $scope.watched[index].isEdit = !$scope.watched[index].isEdit;
        $scope.watched[index].date = new Date($scope.watched[index].date);
    }

    //save changes in watch list
    $scope.saveWatch = function (index) {
        $scope.watchedStatus = !$scope.watchedStatus;
        $scope.watched[index].isEdit = !$scope.watched[index].isEdit;
        var data = {
            userId: $scope.userId,
            rate: $scope.watched[index].rate
        }
        requestService.updateRate($scope.watched[index].id, data).then(function (response) {

        }, function (response) {
            console.log(response.status);
        })
        addMovieService.update($scope.watched[index]).then($scope.loadData);
    }

    //show edit in plan to watch list
    $scope.editPlan = function (index) {
        $scope.planStatus = !$scope.planStatus;
        $scope.plan[index].isEdit = !$scope.plan[index].isEdit;
        $scope.watched[index].date = new Date($scope.watched[index].date);
    }

    //save changes in plan to watch list
    $scope.savePlan = function (index) {
        $scope.planStatus = !$scope.planStatus;
        $scope.plan[index].isEdit = !$scope.plan[index].isEdit;
        var data = {
            userId: $scope.userId,
            rate: $scope.plan[index].rate
        }
        requestService.updateRate($scope.plan[index].id, data).then(function (response) {

        }, function (response) {
            console.log(response.status);
        })
        addMovieService.update($scope.plan[index]).then($scope.loadData);
    }

    //delete movie from watch list
    $scope.deleteWatch = function (index) {
        var data = {
            id: $scope.watched[index].id,
            userId: $scope.userId
        }
        console.log(data);
        requestService.deleteRatingFromAMovie($scope.watched[index].id, data).then(function(response) {
            $scope.watched.splice(index, 1);
        });
        requestService.deleteFavorite(data).then();
    }
    
    $scope.deletePlan = function (index) {
        var data = {
            id: $scope.plan[index].id,
            userId: $scope.userId
        }
        console.log(data);
        requestService.deleteRatingFromAMovie($scope.plan[index].id, data).then(function(response) {
            $scope.plan.splice(index, 1);
        });
        requestService.deleteFavorite(data).then();
    }
})