//попробовать формулу окружности шарика
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var painter = new Painter2D;
painter.canvas = canvas;

var field = new Field;
field.width = 400;
field.height = 400;
field.x = canvas.width/2 - field.width/2;
field.y = 0;
field.strokeStyle = 'black';
field.fillStyle = '#eee';
field.cellPerSide = 10;
field.cells = [];

// generate the available point bases array
points = [];
for(let cellNum = 0; cellNum < field.cellPerSide/2; cellNum++) {
    points.push((cellNum + 1) * 10);
}

// fill the field cells array
for(let r = 0; r < field.cellPerSide; r++) {
    let r_odd = r%2;
    let rowPositivePoints = points.slice();
    let rowNegativePoints = points.slice().map(val => {
        return -val;
    });
    let row = [];

    for(let c = 0; c < field.cellPerSide; c++) {
        let c_odd = c%2;
        let cell = new Cell;
        cell.width = 40;
        cell.height = 40;
        cell.x = field.x + cell.width * c;
        cell.y = field.y + cell.height * r;


        if((!r_odd && !c_odd) || (r_odd && c_odd)){
            cell.strokeStyle = 'rgb(21, 182, 21)';
            cell.fillStyle = 'rgb(21, 182, 21)'

            let random = randomInteger(0, rowPositivePoints.length - 1);
            cell.point = parseInt(rowPositivePoints.splice(random, 1));
        }
        else{
            cell.strokeStyle = 'rgb(255, 140, 140)';
            cell.fillStyle = 'rgb(255, 140, 140)'

            
            let random = randomInteger(0, rowNegativePoints.length - 1);
            cell.point = parseInt(rowNegativePoints.splice(random, 1));
        }

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

        row.push(cell);
    }
    field.cells.push(row);
}

let game = new Game;
let player1 = game.newPlayer();
let player2 = game.newPlayer();

let Player1Label = new Text;
Player1Label.text = 'Player 1';
Player1Label.font = '60px Arial';
ctx.font = Player1Label.font;
Player1Label.x = field.x/2 - ctx.measureText(Player1Label.text).width/2;
Player1Label.y = 60;
let Player1ScoreText = new Text;
Player1ScoreText.text = player1.score;
Player1ScoreText.font = '120px Arial';
ctx.font = Player1ScoreText.font;
Player1ScoreText.x = field.x/2 - ctx.measureText(Player1ScoreText.text).width/2;
Player1ScoreText.y = field.width/2 + 40;

let Player2Label = new Text;
Player2Label.text = 'Player 2';
Player2Label.font = '60px Arial';
ctx.font = Player2Label.font;
Player2Label.x = (canvas.width + (field.x + field.width))/2 - ctx.measureText(Player2Label.text).width/2;
Player2Label.y = 60;
let Player2ScoreText = new Text;
Player2ScoreText.text = player2.score;
Player2ScoreText.font = '120px Arial';
ctx.font = Player2ScoreText.font;
Player2ScoreText.x = (canvas.width + (field.x + field.width))/2 - ctx.measureText(Player2ScoreText.text).width/2;
Player2ScoreText.y = field.width/2 + 40;

document.addEventListener("click", mouseClickHandler, false);

function draw() {
    painter.clear();

    painter.draw(field);
    
    for(r = 0; r < field.cellPerSide; r++) {
        for(c = 0; c < field.cellPerSide; c++) {
            painter.draw(field.cells[r][c]);
            painter.draw(field.cells[r][c].content);
        }
    }
    
    painter.draw(Player1Label);
    painter.draw(Player2Label);

    ctx.font = Player1ScoreText.font;

    Player1ScoreText.text = player1.score;
    Player1ScoreText.x = field.x/2 - ctx.measureText(Player1ScoreText.text).width/2;
    painter.draw(Player1ScoreText)

    Player2ScoreText.text = player2.score;
    Player2ScoreText.x = (canvas.width + (field.x + field.width))/2 - ctx.measureText(Player2ScoreText.text).width/2;
    painter.draw(Player2ScoreText)

    requestAnimationFrame(draw);
}

draw();

function randomInteger(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}