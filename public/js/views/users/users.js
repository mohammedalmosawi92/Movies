var app = angular.module("app.users", ["ngRoute", "request", "adminModule", "idModule"]);
app.config(function ($routeProvider) {
    $routeProvider.when("/users", {
        templateUrl: "/js/views/users/users.tpl.html",
        controller: "usersCtrl"
    })
})



app.controller("usersCtrl", function ($scope, adminService, idService) {
    var userId = function () {
        return idService.getid();
    }
    console.log(userId());


    var previousName = "";
    $scope.sortType = "title";
    $scope.sortWay = "true";
    $scope.loadData = function () {
        adminService.getAllUsers().then(function (response) {
            $scope.list = response.data.data;
            for (var i = 0; i < $scope.list.length; i++) {
                if ($scope.list[i]._id === userId()) {
                    $scope.list[i].match = false
                } else {
                    $scope.list[i].match = true
                }
            }
            $scope.list.map(function (item) {
                item.isEdit = false;
                return item
            });
            console.log($scope.list)
        }, function (response) {
            console.log(response.status);
        })
        
    }

    $scope.deleteUser = function (id) {
        adminService.deleteUser(id).then($scope.loadData);
    }

    $scope.editUser = function (id, username) {
        previousName = username;
        for (var i = 0; i < $scope.list.length; i++) {
            if (id == $scope.list[i]._id) {
                $scope.list[i].isEdit = !$scope.list[i].isEdit
            }
        }
    }

    $scope.updateUser = function (id, username) {
        var data = {};
        var num = 0;
        for (var i = 0; i < $scope.list.length; i++) {
            if (id == $scope.list[i]._id) {
                data = $scope.list[i];
                $scope.list[i].isEdit = !$scope.list[i].isEdit;
            }
            if (username == $scope.list[i].username) {
                num++;
            }
        }
        if (num > 1) {
            alert("Username already exists");
        }
        console.log(data);
        adminService.updateUser(id, data).then($scope.loadData);
    }

    $scope.sortByName = function () {
        $scope.sortType = "username";
        $scope.sortWay = !$scope.sortWay
    }

    $scope.sortByStatus = function () {
        $scope.sortWay = !$scope.sortWay
        $scope.sortType = "privilege";
    }

    $scope.search = function () {
        var searchWord = $scope.searchUsers.toLowerCase();
        for (var i = 0; i < $scope.list.length; i++) {
            var username = $scope.list[i].username.toLowerCase();
            if (username.indexOf(searchWord) != -1) {
                console.log("found");
            } else {
                $scope.list.splice(i, 1);
            }
        }
    }
})