//попробовать формулу окружности шарика
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var painter = new Painter2D;
painter.canvas = canvas;

var field = new Field;
field.width = 400;
field.x = canvas.width/2 - field.width/2;
field.strokeStyle = 'black';

function draw() {
    painter.clear();

    painter.draw(field);
    
    
}

draw();