var app = angular.module("oneUserModule", []);

app.service("oneUserService", function($http) {
    this.getUser = function() {
        return $http.get("http://localhost:8080/oneUser/");
    }
    
    this.getUserById =  function(id) {
        return $http.get("http://localhost:8080/user/" + id);
    }
})