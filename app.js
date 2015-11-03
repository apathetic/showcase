var express = require("express");
var harp = require("harp");
var app = express();

app.use(express.static(__dirname + "/public"));
app.use(harp.mount(__dirname + "/public"));

app.listen(9000);
