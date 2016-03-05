var express = require("express");
var app = express();
var port = process.env.PORT || 8000;
var io = require("socket.io")(app);
var Vector = require("./Vector");
var Snake = require("./Snake");

app.use(express.static('./'));
app.get('/', function (req, res) {
    res.sendfile("./index.html");
});
app.listen(port, function(){
    console.log("listening on port " + port);
});

var snakes = [];
var candy = new Vector(1,1,1);

setInterval(function () {
    updateSnakes();
    io.sockets.emit("update", {snakes: snakes, candy: candy});
}, 400);

io.on("connection",function(socket){
    snakes.push(new Snake(new Vector(5, 5, 0)));

    socket.on("update", function (data) {
        var snake = getSnakeByID(socket.id);
        if (data.direction == "up" && snake.vy != 1) {
            snake.vx = 0;
            snake.vy = -1;
        } else if (data.direction == "down" && snake.vy != -1) {
            snake.vx = 0;
            snake.vy = 1;
        } else if (data.direction == "left" && snake.vx != 1) {
            snake.vx = -1;
            snake.vy = 0;
        } else if (data.direction == "right" && snake.vx != -1) {
            snake.vx = 1;
            snake.vy = 0;
        }
        snake.directionChanged = true;
    });
});

function updateSnakes(){
    snakes.forEach(function(entry){
        entry.move();
    })
}