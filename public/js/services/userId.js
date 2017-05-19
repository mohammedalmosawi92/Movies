var app = angular.module("idModule", []);
app.service("idService", function () {
    var userid = "_id";

    this.setid = function (id) {
        localStorage[userid] = id;
    };

    this.getid = function () {
        return localStorage["_id"];
    };

    this.removeid = function () {
        localStorage.removeItem(userid);
    };
});