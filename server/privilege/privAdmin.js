var express = require("express");

//json web token to verify the token
var jwt = require("jsonwebtoken");

//to get the secret
var config = require("../config.js");

//setup router
var privRouter = express.Router();

privRouter.use("/", function(req, res, next) {
    var token = req.get("Authorization").split("Bearer ")[1];
    jwt.verify(token, config.secret, function(err, decoded) {
        if(err) {
            res.status(500).send({message: "invalid token"})
        }else {
            if(decoded._doc.privilege == "admin") {
                next();
            }else {
                res.status(403).send({"message" : "you can not access this part of the site"})
            }
        }
    })
})

module.exports = privRouter