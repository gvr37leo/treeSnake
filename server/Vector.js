/**
 * only integers
 * @constructor
 */

var Point = function Point(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;
};

Point.prototype.add = function(point){
    this.x += point.x;
    this.y += point.y;
    this.z += point.z;
};

Point.prototype.clone = function(){
    return new Point(this.x, this.y, this.z);
};

Point.prototype.equals = function(point){
    return this.x == point.x && this.y == point.y && this.z == point.z
};