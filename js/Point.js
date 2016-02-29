/**
 * only integers
 * @constructor
 */

var Point = function Point(x, y){
    this.x = x;
    this.y = y;
};

Point.prototype.add = function(point){
    this.x += point.x;
    this.y += point.y;
};

Point.prototype.clone = function(){
    return new Point(this.x, this.y);
};

Point.prototype.equals = function(point){
    return this.x == point.x && this.y == point.y
};