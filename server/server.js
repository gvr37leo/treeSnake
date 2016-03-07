var express = require("express");
var app = express();
var server = require("http").createServer(app);
var port = process.env.PORT || 8000;
var io = require("socket.io")(server);

var Vector = require("./Vector");
var Snake = require("./Snake");
var Player = require("./Player");
var timesHit = 0;
app.use(express.static(__dirname + '/client'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/client/client.html");
});

server.listen(port, function(){
    console.log("listening on port " + port);
});

var players = [];
var candy = Vector.random(6);

setInterval(function () {
    updateSnakes();
    io.sockets.emit("update", {
        players: players, candy: candy
    });
}, 400);

io.on("connection",function(socket){
    timesHit++;
    var snake = new Snake(new Vector(0, 0, 0));
    players.push(new Player(socket.id, snake));

    socket.on("update", function (data) {
        if (data.direction == "forward") {
            snake.velocity = new Vector(0, 0, 1)
        } else if (data.direction == "backward" ) {
            snake.velocity = new Vector(0, 0, -1)
        } else if (data.direction == "left") {
            snake.velocity = new Vector(-1, 0, 0)
        } else if (data.direction == "right") {
            snake.velocity = new Vector(1, 0, 0)
        }else if (data.direction == "up") {
            snake.velocity = new Vector(0, 1, 0)
        }else if (data.direction == "down") {
            snake.velocity = new Vector(0, -1, 0)
        }
    });

    socket.on("disconnect", function () {
        console.log("a client has disconnected: " + socket.id);
        for (var i = 0; i < players.length; i++) {
            if (players[i].id == socket.id) {
                players.splice(i, 1);
            }
        }
    });
});

function updateSnakes(){
    players.forEach(function(entry){
        entry.snake.move();
        candy = entry.snake.tryToEatCandy(candy);
    })
}