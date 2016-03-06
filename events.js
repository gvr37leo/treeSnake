function onKeyDown(e){
    if (e.keyCode == 87 || e.keyCode == 38) {//w
        snake.velocity = new Point(0, 1);
    }
    if (e.keyCode == 83 || e.keyCode == 40) {//s
        snake.velocity = new Point(0, -1);
    }
    if (e.keyCode == 65 || e.keyCode == 37) {//a
        snake.velocity = new Point(-1, 0);
    }
    if (e.keyCode == 68 || e.keyCode == 39) {//d
        snake.velocity = new Point(1, 0);
    }
}

window.addEventListener("keydown", onKeyDown);