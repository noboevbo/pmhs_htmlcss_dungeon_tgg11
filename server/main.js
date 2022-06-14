var express = require("express");
var app = express();

//setting middleware
app.use(express.static(__dirname + "/../client")); //Serves resources from public folder

var server = app.listen(5001);
