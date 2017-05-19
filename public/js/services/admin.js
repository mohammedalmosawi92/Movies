var app = angular.module("adminModule", []);

app.service("adminService", function($http) {
    this.getAllUsers = function() {
        return $http.get("http://localhost:8080/users/");
    }
    
    this.deleteUser = function(id) {
        return $http.delete("http://localhost:8080/users/" + id);
    }
    
    this.updateUser = function(id, data) {
        var query = "?";
        for(key in data) {
            query += key + "=" + data[key] + "&";
        }
        return $http.put("http://localhost:8080/users/" + id + query);
    }
})