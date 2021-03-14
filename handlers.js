
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX-paddle.width/2 >= 0 && relativeX+paddle.width/2 <= 
        canvas.width) {
        paddle.x = relativeX - paddle.width/2;
    }
    else if(relativeX-paddle.width/2 < 0){
        paddle.x = 0;
    }
    else if(relativeX+paddle.width/2 > canvas.width){
        paddle.x = canvas.width-paddle.width;
    }
}