//попробовать формулу окружности шарика
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var painter = new Painter2D;
painter.canvas = canvas;

var field = new Field;
// console.log(field.cells);


function draw() {
    painter.clear();

    field.cells.forEach(cellRow => {
        cellRow.forEach(cell => {
            console.log(cell);
                painter.draw(cell);
        })
    })
    
    
}

draw();