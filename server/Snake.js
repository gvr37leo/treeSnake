var BodyPart = require("./BodyPart");
var Vector = require("./Vector");

var Snake = function Snake(vector){
    this.head = vector;
    this.velocity = new Vector(1, 0, 0);
    this.length = 10;
    this.bodyParts = [new BodyPart(this.head.clone())];
    //this.msBetweenMoves = 400;
    //this.nextMoveTime = new Date().getTime();
};

Snake.prototype.isColliding = function(snake){
    for(var i = 0; i < snake.bodyParts.length; i++){
        var bodyPart = snake.bodyParts[0];
        if(this.head.equals(bodyPart)){
            return true;
        }
    }
    return false;
};

Snake.prototype.move = function(){
    //var currentTime = new Date().getTime();
    //if(currentTime > this.nextMoveTime){
    //    this.nextMoveTime = currentTime + this.msBetweenMoves;

        this.head.add(this.velocity);
        this.bodyParts.push(new BodyPart(this.head.clone()));
        for (var i = this.bodyParts.length - 1; i >= 0; i--) {
            var bodyPart = this.bodyParts[i];
            bodyPart.age++;
            if (bodyPart.age > this.length) {
                //bodyPart.mesh.dispose();
                this.bodyParts.splice(i, 1);
            }
        }
    //}
};

module.exports = Snake;
