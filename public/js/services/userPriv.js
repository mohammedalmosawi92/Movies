var app = angular.module("privModule", []);
app.service("privService", function () {
    var userpriv = "priv";

    this.setpriv = function (priv) {
        localStorage[userpriv] = priv;
    };

    this.getpriv = function () {
        return localStorage[userpriv];
    };
    
    this.removepriv = function () {
        localStorage.removeItem(userpriv);
    };
});