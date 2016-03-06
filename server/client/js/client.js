var socket = io.connect("https://treesnake.herokuapp.com/");
var canvas = document.querySelector("#renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

window.addEventListener('keydown',doKeyDown);
socket.on('update', function (data) {
    console.log(data);
    var scene = createScene(data);
    scene.render();
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

function createScene(data){
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 10, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 10, -10), scene);

    var blood = new BABYLON.StandardMaterial("texture",scene);
    blood.diffuseColor = new BABYLON.Color3(1, 0, 0);
    var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
    data.players.forEach(function(player){
        player.snake.bodyParts.forEach(function(bodypart, index){
            var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 1, scene);
            sphere.material = blood;
            sphere.position.x = bodypart.position.x;
            sphere.position.y = bodypart.position.y + 0.5;
            sphere.position.z = bodypart.position.z;
        })
    });
    return scene;
}
