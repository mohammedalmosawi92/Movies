var express = require("express");
var User = require("../models/signing.js");
var privAdmin = require("../privilege/privAdmin.js");
var jwt = require("jsonwebtoken");
var config = require("../config.js");
var userAndAdminPriv = require("../privilege/userAndAdmin.js");
//setup router
var usersRouter = express.Router();

usersRouter.use(userAndAdminPriv);
//add movie to a specific user
usersRouter.post("/AddMovie/", function(req, res) {
    var id = "";
    var token = req.get("Authorization").split("Bearer ")[1];
    jwt.verify(token, config.secret, function(err, decoded){
        if(err) {
            res.status(500).send({message: "invalid token"});
        }else {
            id = decoded._doc._id;
            User.findById({_id: id}, function(err, data) {
                if(err) {
                    res.status(500).send(err);
                }else {
                    data.favorite.push(req.body);
                    data.save(function(err, data) {
                        if(err) {
                            res.status(500).send(err);
                        }else {
                            res.status(200).send({message: "success", data: data})
                        }
                    })
                }
            })
        }
    })
});

//update movie info for a specific user
usersRouter.put("/updateMovie/", function(req, res) {
    var id = "";
    var token = req.get("Authorization").split("Bearer ")[1];
    jwt.verify(token, config.secret, function(err, decoded){
        if(err) {
            res.status(500).send({message: "invalid token"});
        }else {
            id = decoded._doc._id;
            User.findById({_id: id}, function(err, data) {
                if(err) {
                    res.status(500).send(err);
                }else {
                    for(var i = 0; i < data.favorite.length; i++) {
                        if(data.favorite[i].id == req.body.id) {
                            data.favorite.splice(i, 1);
                            data.favorite.splice(i, 0, req.body);
                        }
                    }
                    data.save(function(err, newData) {
                        if(err) {
                            res.status(500).send(err);
                        }else {
                            res.status(200).send({message: "success", data: newData})
                        }
                    })
                }
            })
        }
    })
});

//delete a movie from a user list
usersRouter.put("/delFavoriteMovie", function(req, res) {
    var id = "";
    var token = req.get("Authorization").split("Bearer ")[1];
    jwt.verify(token, config.secret, function(err, decoded){
        if(err) {
            res.status(500).send({message: "invalid token"});
        }else {
            id = decoded._doc._id;
            User.findById({_id: id}, function(err, data) {
                if(err) {
                    res.status(500).send(err);
                }else {
                    for(var i = 0; i < data.favorite.length; i++) {
                        if(data.favorite[i].id == req.body.id) {
                            data.favorite.splice(i, 1);
                        }
                    }
                    data.save(function(err, newData) {
                        if(err) {
                            res.status(500).send(err);
                        }else {
                            res.status(200).send({message: "success", data: newData})
                        }
                    })
                }
            })
        }
    })
})

//get one user
usersRouter.get("/oneUser/", function(req, res) {
    var token = req.get("Authorization").split("Bearer ")[1];
    jwt.verify(token, config.secret, function(err, decoded){
        if(err) {
            res.status(500).send({message: "invalid token"});
        }else {
//            res.status(200).send({success: true, data: decoded._doc});
            id = decoded._doc._id;
            User.findById({_id: id}, function(err, data) {
                if(err) {
                    res.status(500).send(err);
                }else {
                    res.status(200).send({message: "success",data: data})
                }
            })
        }
    })
});

//only the admin can do the requests below
usersRouter.use(privAdmin);

//get all users
usersRouter.get("/users", function(req, res) {
    User.find({}, function(err, data) {
        if(err) {
            res.status(500).send(err);
        }else {
            res.status(200).send({message: "success", data: data});
        }
    })
})

//get user by id
usersRouter.get("/user/:id", function(req, res) {
    User.findById({_id: req.params.id}, function(err, data) {
        if(err) {
            res.status(500).send(err);
        }else {
            res.status(200).send({message: "success", data: data});
        }
    })
})

//delete a user
usersRouter.delete("/users/:id", function(req, res) {
    User.findById(req.params.id, {}, function(err, user) {
        if(err) {
            res.status(500).send(err);
        }else {
            user.remove(function(err, data) {
                if(err) {
                    res.status(500).send(err);
                }else {
                    res.status(200).send({success: true, data: data});
                }
            });
        }
    })
})

//update user info
usersRouter.put("/users/:id", function(req, res) {
    User.findById(req.params.id, function(err, data) {
        if(err) {
            res.status(500).send(err);
        }else {
            for(key in req.query) {
                data[key] = req.query[key];
            }
            data.save(function(err, data) {
                if(err) {
                    res.status(500).send(err);
                }else {
                    res.status(200).send({success: true, message: "You have updated a movie"});
                }
            })
        }
    }) 
})

module.exports = usersRouter;