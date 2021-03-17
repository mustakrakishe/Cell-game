//попробовать формулу окружности шарика
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var painter = new Painter2D;
painter.canvas = canvas;

let matrixSettings = {
    'width': 10,
    'height': 10,
    'minVal': 0,
    'step': 1
}
let matrix = nonRepeatNumMatrix(matrixSettings.width, matrixSettings.height, matrixSettings.minVal, matrixSettings.step);

let cells = [];
matrix.forEach(matrixRow => {
    let cellRow = [];

    matrixRow.forEach(element => {
        cell = new Cell;

        let cell = new Cell;
        cell.width = 40;
        cell.height = 40;
        cell.x = this.x + cell.width * c;
        cell.y = this.y + cell.height * r;
        
        cell.setPoint(point);
        cell.setStatus(1);

        cell.content = {
            'text': cell.point | 0,
            'font': '20px Arial',
            'fillStyle': 'white',
            'x': cell.x,
            'y': cell.y
        };
        ctx.font = cell.content.font;
        cell.content.x = cell.x + cell.width/2 - ctx.measureText(cell.content.text).width/2;
        cell.content.y = cell.y + cell.height/2 + 7;
    });
});

var field = new Field;
field.width = 400;
field.height = 400;
field.x = canvas.width/2 - field.width/2;
field.y = 0;
field.cells = cells;
// field.setCellsStatusPattern(cellsStatusPattern);

let game = new Game;
let player1 = game.newPlayer();
let player2 = game.newPlayer();

let Player1Label = new Text;
Player1Label.text = 'Player 1';
Player1Label.font = '60px Arial';
ctx.font = Player1Label.font;
Player1Label.x = field.x/2 - ctx.measureText(Player1Label.text).width/2;
Player1Label.y = 60;
Player1Label.fillStyle = 'white';
let Player1ScoreText = new Text;
Player1ScoreText.text = player1.score;
Player1ScoreText.font = '120px Arial';
ctx.font = Player1ScoreText.font;
Player1ScoreText.x = field.x/2 - ctx.measureText(Player1ScoreText.text).width/2;
Player1ScoreText.y = field.width/2 + 40;
Player1ScoreText.fillStyle = 'white';

let Player2Label = new Text;
Player2Label.text = 'Player 2';
Player2Label.font = '60px Arial';
ctx.font = Player2Label.font;
Player2Label.x = (canvas.width + (field.x + field.width))/2 - ctx.measureText(Player2Label.text).width/2;
Player2Label.y = 60;
Player2Label.fillStyle = 'white';
let Player2ScoreText = new Text;
Player2ScoreText.text = player2.score;
Player2ScoreText.font = '120px Arial';
ctx.font = Player2ScoreText.font;
Player2ScoreText.x = (canvas.width + (field.x + field.width))/2 - ctx.measureText(Player2ScoreText.text).width/2;
Player2ScoreText.y = field.width/2 + 40;
Player1ScoreText.fillStyle = 'white';

let playerPointer = new PlayerPointer;
playerPointer.width = 80;
playerPointer.height = 40;
playerPointer.setPos(field.x/2 - playerPointer.width/2, canvas.height - 17);
playerPointer.fillStyle = 'white';

document.addEventListener("click", mouseClickHandler, false);

function draw() {
    painter.clear();
    
    field.cells.forEach(row => {
        row.forEach(cell => {
            painter.draw(cell);
            painter.draw(cell.content);
        });
    });
    
    painter.draw(Player1Label);
    painter.draw(Player2Label);

    ctx.font = Player1ScoreText.font;

    Player1ScoreText.text = player1.score;
    ctx.font = Player1ScoreText.font;
    Player1ScoreText.x = field.x/2 - ctx.measureText(Player1ScoreText.text).width/2;
    painter.draw(Player1ScoreText)

    Player2ScoreText.text = player2.score;
    ctx.font = Player2ScoreText.font;
    Player2ScoreText.x = (canvas.width + (field.x + field.width))/2 - ctx.measureText(Player2ScoreText.text).width/2;
    painter.draw(Player2ScoreText)

    painter.draw(playerPointer);

    requestAnimationFrame(draw);
}

draw();