var express= require("express");
var mongoose = require("mongoose");
var ejs = require("ejs");
var path = require("path");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
var config = require("./config.js")

//connect to database
mongoose.connect("mongodb://localhost/"+ config.database);
//setup port
var port = process.env.Port || 8080;

//setup app
var app = express();

//setup server to handle json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//setup server to handle html
app.use(express.static(path.join(__dirname + "\\..\\public\\")));
app.set("views", __dirname + "\\..\\public\\views");
app.engine("html", ejs.renderFile);
app.set("view engine", "ejs");

//import routes
var filesRouter = require("./routes/files.js");
var authRouter = require("./routes/auth.js");
var apiRouter = require("./routes/api.js");
var usersRouter = require("./routes/users.js");

//app.use("/api", expressJwt({secret: config.secret}));
//use imported routes
app.use(filesRouter);
app.use(authRouter);
app.use("/api", apiRouter);
app.use(usersRouter);
//listen to port
app.listen(port, function() {
    console.log("I am listening at port " + port);
})