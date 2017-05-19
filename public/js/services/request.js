var app = angular.module("request", ["authModule"]);

app.service("requestService", function ($http) {

    //to get all movies
    this.get = function () {
        return $http.get("http://localhost:8080/api/");
    };

    //to get a specific
    this.getById = function (id) {
        return $http.get("http://localhost:8080/api/" + id);
    };

    //to post a new movie
    this.post = function (data) {
        return $http.post("http://localhost:8080/api/", data);
    };

    //to post a review to a specific movie    
    this.postReview = function (id, data) {
        return $http.post("http://localhost:8080/api/" + id + "/review", data);
    };

    //to delete a specific movie
    this.del = function (id) {
        return $http.delete("http://localhost:8080/api/" + id);
    };

    //to delete a specific review
    this.delReview = function (id, index) {
        return $http.delete("http://localhost:8080/api/" + id + "/" + index);
    };

    //to rate a movie
    this.rate = function (id, data) {
        return $http.post("http://localhost:8080/api/" + id + "/rating", data);
    };

    //update the rate of a movie
    this.updateRate = function (id, data) {
        return $http.put("http://localhost:8080/api/" + id + "/updateRating", data);
    };

    //delete favorite movie from a user
    this.deleteFavorite = function (data) {
        return $http.put("http://localhost:8080/delFavoriteMovie", data);
    }

    //delete rating from a movie
    this.deleteRatingFromAMovie = function (id, data) {
        return $http.put("http://localhost:8080/api/" + id + "/deleteRating", data);
    }

    //to update a specific movie
    this.put = function (id, data) {
        var query = "?";
        for (key in data) {
            query += key + "=" + data[key] + "&";
        }
        return $http.put("http://localhost:8080/api/" + id + query);
    };

    // delete screen shot;
    this.delScreenshot = function (id, index) {
        return $http.put("http://localhost:8080/api/" + id + "/deletescreen/" + index);
    };

    this.updateScreen = function (id, index, data) {
        return $http.put("http://localhost:8080/api/" + id + "/updateScreen/" + index, data);
    };

    this.addScreen = function (id, data) {
        return $http.put("http://localhost:8080/api/" + id + "/addScreen/", data);
    };



    //to update a cast
    this.updateCast = function (id, data) {
        console.log(data);
        return $http.put("http://localhost:8080/api/" + id + "/cast/", data);
    };
})