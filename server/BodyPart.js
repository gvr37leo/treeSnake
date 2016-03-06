var BodyPart = function BodyPart(vector){
    this.position = vector;
    this.age = 0;
    this.direction = 0;

    //this.material = new BABYLON.StandardMaterial("texture",scene);
    //this.material.diffuseColor = new BABYLON.Color3(0, 1, 0);

    //this.mesh = BABYLON.Mesh.CreateBox("box", 1, scene);
    //this.mesh.material = this.material;
    //this.mesh.position = new BABYLON.Vector3(point.x, 0.5, point.y);
    //this.mesh.scaling = new BABYLON.Vector3(0.8, 0.8, 0.8);
};

module.exports = BodyPart;