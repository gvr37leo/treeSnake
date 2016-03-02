var express = require("express");
var app = express();
var port = process.env.PORT || 8000;

app.use(express.static('./'));
app.get('/', function (req, res) {
    res.sendfile("./index.html");
});

app.listen(port, function(){
    console.log("listening on port " + port);
});