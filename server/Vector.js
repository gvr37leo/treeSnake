/**
 * only integers
 * @constructor
 */
var Vector = function Vector(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;
};

Vector.prototype.add = function(vector){
    this.x += vector.x;
    this.y += vector.y;
    this.z += vector.z;
};

Vector.prototype.clone = function(){
    return new Vector(this.x, this.y, this.z);
};

Vector.prototype.equals = function(vector){
    return this.x == vector.x && this.y == vector.y && this.z == vector.z
};

module.exports = Vector;