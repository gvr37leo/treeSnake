var canvas = document.querySelector("#renderCanvas");
var engine = new BABYLON.Engine(canvas, false);
var sphere;

var createScene = function () {
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(-60, 60, 80), scene);

    var blood = new BABYLON.StandardMaterial("texture", scene);
    blood.diffuseColor = new BABYLON.Color3(1, 0, 0); //Red
    sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
    sphere.material = blood;
    sphere.position.y = 1;
    var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
    return scene;
};

setInterval(function(){
    sphere.position.z += 0.01;
    scene.render();
}, 1000/60);
var scene = createScene();
//engine.runRenderLoop(function () {
//
//});
//window.addEventListener("resize", function () {
//    engine.resize();
//});