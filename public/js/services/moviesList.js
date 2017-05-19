var app = angular.module("moviesModule", []);
app.service("moviesService", function($http) {
    
    this.getMovies = function() {
        return $http.get("https://yts.ag/api/v2/list_movies.json?limit=50&with_rt_ratings=true&minimum_rating=7.5");
    }
    
    this.getPicAndCast = function(id) {
        return $http.get("https://yts.ag/api/v2/movie_details.json?movie_id=" + id + "&with_images=true&with_cast=true");
    }
    
    this.getMore = function(id) {
        return $http.get("https://api.themoviedb.org/3/movie/" + id + "?api_key=2ecaeb58236d5a4105329f8c54c6edec");
    }
    
    this.top = function() {
        return $http.get("https://yts.ag/api/v2/list_movies.json?sort_by=rating&limit=50");
    }
    
})