var app = angular.module("addMovieModule", []);

app.service("addMovieService", function ($http) {
    this.add = function (data) {
        return $http.post("http://localhost:8080/addMovie/", data);
    }

    this.update = function (data) {
        return $http.put("http://localhost:8080/updateMovie/", data);
    }
})