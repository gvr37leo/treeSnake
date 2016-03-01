var canvas = document.querySelector("#renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var sphere, light, blood;
var speed = 1;


var createScene = function () {
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 10, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 10, -10), scene);

    blood = new BABYLON.StandardMaterial("texture",scene);
    blood.diffuseColor = new BABYLON.Color3(1, 0, 0);
    sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 1, scene);
    sphere.material = blood;
    sphere.position.y = 1;
    var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
    return scene;
};

var scene = createScene();
var snake = new Snake(new Point(0,0));

engine.runRenderLoop(function () {
    snake.move();
    sphere.position.z += speed * (engine.getDeltaTime() / 1000);
    scene.render();
});