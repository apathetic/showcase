var express = require("express");
var harp = require("harp");
var builder = require("./builder.js");
var app = express();

// programmatically generate each component page
builder.clean();
builder.build();

app.use(express.static(__dirname + "/public"));
app.use(harp.mount(__dirname + "/public"));

app.listen(9000);
console.log("HUGE Components is running on localhost, port 9000")
