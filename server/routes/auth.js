var express = require("express");
var User = require("../models/signing.js");
var jwt = require("jsonwebtoken");
var config = require("../config.js");
//setup router
var authRouter = express.Router();
var bcrypt = require("bcrypt-nodejs");

authRouter.post("/signup", function(req, res) {
    User.find({username: req.body.username}, function(err, data) {
        if(err) {
            res.status(500).send(err);
        }else if(data.length > 0) {
            res.status(400).send({message: "This username already exists"})
        }else {
            if(req.body.password != undefined) {
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(req.body.password, salt);
                console.log(hash);
                req.body.password = hash;
            }else {
                res.status(400).send({message: "you must have a password"})
            }
            var newUser = new User(req.body);
            newUser.save(function(err, result) {
                if(err) {
                    res.status(500).send(err);
                }else {
                    res.status(200).send({message: "You have signed up"})
                }
            })
        }
    })
});

authRouter.post("/signin", function(req, res) {
    User.findOne({username: req.body.username}, function(err, myUser) {
        if(err) {
            res.status(500).send(err);
        }else if(myUser == undefined) {
            res.status(400).send({message: "The username does not exist"})
        }else {
            bcrypt.compare(req.body.password, myUser.password, function(err, result){
                if(err) {
                    res.status(500).send({err: err})
                }else if(result) {
                    var token = jwt.sign(myUser, config.secret, {expiresIn: "2h"});
                    res.status(200).send({message: "you have logged in", token: token, priv: myUser.privilege, id: myUser._id, favorite: myUser.favorite});
                }else {
                    res.status(400).send({message: "The password is wrong"})
                }
            }) 
        }
    })
})

module.exports = authRouter;