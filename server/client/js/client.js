//"https://treesnake.herokuapp.com/"
var socket = io.connect("http://localhost:8000");
var canvas = document.querySelector("#renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color3(0, 0, 0);
var blood = new BABYLON.StandardMaterial("texture1",scene);
blood.diffuseColor = new BABYLON.Color3(1, 0, 0);
var grass = new BABYLON.StandardMaterial("texture2",scene);
grass.diffuseColor = new BABYLON.Color3(0, 1, 0);
var water = new BABYLON.StandardMaterial("texture3",scene);
water.diffuseColor = new BABYLON.Color3(0, 0, 1);
var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 10, -10), scene);
camera.setTarget(BABYLON.Vector3.Zero());
var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 10, -10), scene);
var meshes = [];

window.addEventListener('keydown',doKeyDown);
socket.on('update', function (data) {
    console.log(data);
    scene = populateScene(data);
    scene.render();
    meshes.forEach(function(mesh){
        mesh.dispose();
    })
});

function doKeyDown(e){
    if (e.keyCode == 87 || e.keyCode == 38) {//w
        socket.emit("update",{"socketID":socket.id,"direction":"forward"});
    }
    else if (e.keyCode == 83 || e.keyCode == 40) {//s
        socket.emit("update",{"socketID":socket.id,"direction":"backward"});
    }
    else if (e.keyCode == 65 || e.keyCode == 37) {//a
        socket.emit("update",{"socketID":socket.id,"direction":"left"});
    }
    else if (e.keyCode == 68 || e.keyCode == 39) {//d
        socket.emit("update",{"socketID":socket.id,"direction":"right"});
    }
    else if (e.keyCode == 82) {//r
        socket.emit("update",{"socketID":socket.id,"direction":"up"});
    }
    else if (e.keyCode == 70) {//f
        socket.emit("update",{"socketID":socket.id,"direction":"down"});
    }
}

function populateScene(data){
    var candy = BABYLON.Mesh.CreateSphere("sphere1", 16, 1, scene);
    candy.position = new BABYLON.Vector3(data.candy.x, data.candy.y, data.candy.z);
    meshes.push(candy);
    data.players.forEach(function(player){
        player.snake.bodyParts.forEach(function(bodyPart){
            meshes.push(createBodypartMesh(bodyPart));
        })
    });
    return scene;
}

window.addEventListener('resize', function(){
    engine.resize();
});

function createBodypartMesh(bodypart){
    var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 1, scene);

    switch (bodypart.position.y){
        case 0:
            sphere.material = blood;
            break;
        case 1:
            sphere.material = grass;
            break;
        default:
            sphere.material = water;
    }
    sphere.position = new BABYLON.Vector3(bodypart.position.x,bodypart.position.y,bodypart.position.z);
    return sphere;
}