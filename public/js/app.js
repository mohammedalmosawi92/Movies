var app = angular.module("myApp", ["ngRoute", "app.home", "app.signin", "app.signup", "authModule", "app.top", "convertTime", "app.oneMovie", "request", "app.searchList", "app.addMovie", "tokenModule", "idModule", "privModule", "app.myList", "app.addMovieState", "app.advanceSearch", "app.users", "app.cast", "app.screenshot", "app.userList"]);

app.service("AuthInterceptor", ["$q", "$location", "TokenService", function ($q, $location, TokenService) {
    this.request = function (config) {
        var token = TokenService.getToken();
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = "Bearer " + token;
        }
        return config;
    };

    this.responseError = function (response) {
        if (response.status === 401 || response.status === 500) {
            TokenService.removeToken();
        }
        return $q.reject(response);
    };
}]);

app.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.interceptors.push("AuthInterceptor");
}]);

app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider.when("/", {
        redirectTo: "/home"
    }).otherwise({
        redirectTo: "/home"
    })
})

app.controller("ctrl", function ($scope, requestService, $location, authService, TokenService, privService, idService) {
    $scope.priv = function() {
        return privService.getpriv();
    }
    $scope.hide = function () {
        return authService.isAuthenticated();
    };
    
    $scope.search = function () {
        requestService.get().then(function (response) {
            $scope.movieList = response.data.data;
            for (var i = 0; i < $scope.movieList.length; i++) {
                var title = $scope.movieList[i].title.toLowerCase();
                var movieSeach = $scope.movieSearch.toLowerCase();
                if (title.indexOf(movieSeach) != -1) {
                    $scope.movieSearch = "";
                    $location.path("/searchList/" + movieSeach);
                    break;
                }
            }
        }, function (response) {
            console.log(response.status);
        })
    };

    $scope.signin = function () {
        var data = {
            username: $scope.username,
            password: $scope.password,
        }
        authService.signIn(data).then(function (response) {
            TokenService.setToken(response.data.token);
            privService.setpriv(response.data.priv);
            idService.setid(response.data.id);
        });
        $scope.username = "";
        $scope.password = "";
    };
    
    $scope.logout = function () {
        TokenService.removeToken();
        privService.removepriv();
        idService.removeid();
    };
})