var Snake = function Snake(point){
    this.head = point;
    this.velocity = new Point(1,0);
    this.length = 3;
    this.bodyParts = [];
    this.material = new BABYLON.StandardMaterial("texture",scene);
    this.material.diffuseColor = new BABYLON.Color3(0, 1, 0);
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
    var mesh = BABYLON.Mesh.CreateBox("box", 1, scene);
    mesh.material = this.material;
    mesh.position = new BABYLON.Vector3(this.head.x, 0.5, this.head.y);
    this.bodyParts.push(new BodyPart(this.head.clone(),mesh));
    for (var i = this.bodyParts.length - 1; i >= 0; i--) {
        var bodyPart = this.bodyParts[i];
        bodyPart.age++;
        if (bodyPart.age > this.length) {
            bodyPart.mesh.dispose();
            this.bodyParts.splice(i, 1);
        }
    }
    this.head.add(this.velocity);
};
