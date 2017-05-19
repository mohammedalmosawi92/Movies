var express = require("express");
var mongoose = require("mongoose");
var Movie = require("../models/movies.js");
var privAdmin = require("../privilege/privAdmin.js");
var userAndAdminPriv = require("../privilege/userAndAdmin.js");
//setup router
var apiRouter = express.Router();

//get all movies
apiRouter.get("/",function(req, res) {
    Movie.find({}, function(err, data) {
        if(err) {
            res.status(500).send(err);
        }else {
            res.status(200).send({success: true, data: data});
        }
    })
});

// get movie by id
apiRouter.get("/:id", function(req, res) {
    Movie.findById(req.params.id, {}, function(err, data) {
        if(err) {
            res.status(500).send(err);
        }else {
            res.status(200).send({success: true, data: data});
        }
    })
});

apiRouter.use(userAndAdminPriv);
//delete a specific comment
apiRouter.delete("/:id/:commentIndex", function(req, res) {
    Movie.findById(req.params.id, {}, function(err, data) {
        if(err) {
            res.status(500).send(err);
        }else {
            var index = req.params.commentIndex;
            data.review.splice(index, 1);
            data.save(function(err, data) {
                if(err) {
                    res.status(500).send(err);
                }else {
                    res.status(200).send({success: true, data: data});
                }
            })
        }
    })
})

//add a comment to a specific movie
apiRouter.post("/:id/review", function(req, res) {
    Movie.findById(req.params.id, function(err, data) {
        if(err) {
            res.status(500).send(err);
        }else {
            data.review.push(req.body);
            data.save(function(err, data) {
                if(err) {
                    res.status(500).send(err);
                }else {
                    res.status(200).send({success: true, data: data});
                }
            })
        }
    })
});

//add rate to movie
apiRouter.post("/:id/rating", function(req, res) {
    Movie.findById(req.params.id, function(err, data) {
        if(err) {
            res.status(500).send(err);
        }else {
            data.MyMoviesRating.push(req.body);
            data.save(function(err, data) {
                if(err) {
                    res.status(500).send(err);
                }else {
                    res.status(200).send({success: true, data: data});
                }
            })
        }
    })
})

//update rating
apiRouter.put("/:id/updateRating", function(req, res) {
    Movie.findById(req.params.id, function(err, data) {
        if(err) {
            res.status(500).send(err);
        }else {
            var noUpdate = false;
            for(var i = 0; i < data.MyMoviesRating.length; i++) {
                if(data.MyMoviesRating[i].userId == req.body.userId) {
                    data.MyMoviesRating.splice(i, 1);
                    data.MyMoviesRating.splice(i, 0 ,req.body);
                    noUpdate = true
                }
            }
            
            if(noUpdate == false) {
                data.MyMoviesRating.push(req.body);
            }
            
            data.save(function(err, data) {
                if(err) {
                    res.status(500).send(err);
                }else {
                    res.status(200).send({success: true, data: data});
                }
            })
        }
    })
});

//delete rating from a movie
apiRouter.put("/:id/deleteRating", function(req, res) {
    Movie.findById(req.params.id, function(err, data) {
        if(err) {
            res.status(500).send(err);
        }else {
            for(var i = 0; i < data.MyMoviesRating.length; i++) {
                if(data.MyMoviesRating[i].userId == req.body.userId) {
                    data.MyMoviesRating.splice(i, 1);
                }
            }
            data.save(function(err, data) {
                if(err) {
                    res.status(500).send(err);
                }else {
                    res.status(200).send({success: true, data: data});
                }
            })
        }
    })
})

apiRouter.use(privAdmin);
//add new movie
apiRouter.post("/", function(req, res) {
    var newMovie = new Movie(req.body);
    newMovie.save(function(err, data) {
        if(err) {
            res.status(500).send(err);
        }else {
            res.status(200).send({success: true, data: data});
        }
    })
});

//delete a specific movie
apiRouter.delete("/:id", function(req, res) {
    Movie.findById(req.params.id, function(err, data) {
        if(err) {
            res.status(500).send(err);
        }else {
            data.remove(function(err, result) {
                if(err) {
                    res.status(500).send(err);
                }else {
                    res.status(200).send({success: true, message: "You have delete a movie"});
                }
            })
        }
    })
});

//update a spcific movie
apiRouter.put("/:id", function(req, res) {
    Movie.findById(req.params.id, function(err, data) {
        if(err) {
            res.status(500).send(err);
        }else {
            for(key in req.query) {
                if(key === 'screenshot') {
                    data[key] = req.query[key].split(",");
                    console.log(data[key]);
                }else {
                    console.log(req.query[key]);
                    data[key] = req.query[key];
                }
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
});

//update the cast
apiRouter.put("/:id/cast", function(req, res) {
    Movie.findById(req.params.id, function(err, data) {
        if(err) {
            res.status(500).send(err);
        }else {
            console.log(req.body.cast);
            data.cast = req.body.cast;
            data.save(function(err, data) {
                if(err) {
                    res.status(500).send(err);
                }else {
                    res.status(200).send({success: true, message: "You have updated a movie"});
                }
            })
        }
    })
});

//delete a screenshot
apiRouter.put("/:id/deletescreen/:index", function(req, res) {
    Movie.findById(req.params.id, function(err, data) {
        if(err) {
            res.status(500).send(err);
        }else {
            data.screenshot.splice(req.params.index, 1);
            data.save(function(err, data) {
                if(err) {
                    res.status(500).send(err);
                }else {
                    res.status(200).send({success: true, message: "You have updated a movie"});
                }
            })
        }
    })
});

//delete a screenshot
apiRouter.put("/:id/updateScreen/:index", function(req, res) {
    Movie.findById(req.params.id, function(err, data) {
        if(err) {
            res.status(500).send(err);
        }else {
            data.screenshot.splice(req.params.index, 1);
            data.screenshot.splice(req.params.index, 1, req.body.url);
            data.save(function(err, data) {
                if(err) {
                    res.status(500).send(err);
                }else {
                    res.status(200).send({success: true, message: "You have updated a movie"});
                }
            })
        }
    })
});

//add screenshot
apiRouter.put("/:id/addScreen/", function(req, res) {
    Movie.findById(req.params.id, function(err, data) {
        if(err) {
            res.status(500).send(err);
        }else {
            data.screenshot.push(req.body.url);
            data.save(function(err, data) {
                if(err) {
                    res.status(500).send(err);
                }else {
                    res.status(200).send({success: true, message: "You have updated a movie"});
                }
            })
        }
    })
});


module.exports = apiRouter;