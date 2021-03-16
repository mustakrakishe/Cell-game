
class Field{
    constructor(width, height, x, y, strokeStyle, fillStyle, cellPerSide, cells){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.strokeStyle = strokeStyle;
        this.fillStyle = fillStyle;
        this.cellPerSide = cellPerSide;
        this.cells = cells;
    }

    fill(){
        // generate the available point bases array
        let availablePointBases = [];
        for(let baseNum = 0; baseNum < this.cellPerSide/2; baseNum++) {
            availablePointBases.push((baseNum + 1) * 10);
        }

        // fill the field cells array
        for(let r = 0; r < this.cellPerSide; r++) {
            let r_odd = r%2;
            let rowPositivePoints = availablePointBases.slice();
            let rowNegativePoints = availablePointBases.slice().map(val => {
                return -val;
            });
            let row = [];

            for(let c = 0; c < this.cellPerSide; c++) {
                let c_odd = c%2;
                let cell = new Cell;
                cell.width = 40;
                cell.height = 40;
                cell.x = this.x + cell.width * c;
                cell.y = this.y + cell.height * r;

                let point = 0;
                if((!r_odd && !c_odd) || (r_odd && c_odd)){
                    let random = randomInteger(0, rowPositivePoints.length - 1);
                    point = parseInt(rowPositivePoints.splice(random, 1));
                }
                else{
                    let random = randomInteger(0, rowNegativePoints.length - 1);
                    point = parseInt(rowNegativePoints.splice(random, 1));
                }
                
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

                row.push(cell);
            }
            this.cells.push(row);
        }
    }
}

class Cell{
    constructor(width, height, x, y, strokeStyle, fillStyle, point, status){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.strokeStyle = strokeStyle;
        this.fillStyle = fillStyle;
        this.point = point;
        this.status = status;
    }

    setPoint(point){
        this.point = point;
        let color = '';

        if(point > 0) {
            color = 'rgba(21, 182, 21, 100)';
        }
        else if(point < 0){
            color = 'rgba(255, 140, 140, 100)';
        }

        this.fillStyle = color;
    }

    setFillStyle(r, g, b, a){
        this
    }

    setStatus(status){
        this.status = status;

        switch(status){
            case 0:
                this.fillStyle = '#eee';
                break;

            case 1:
                this.setPoint(this.point);
                break;

            case 2:
                this.setPoint(this.point);
                this.fillStyle = 'rgb(207, 207, 207)';
                break;

        }
    }

    setTransparency(val){
        this.fillStyle.replace(/\d+\)/, val + ')');
        console.log(this.fillStyle);
    }
}

class PlayerPointer{
    constructor(width, height, x, y, strokeStyle, fillStyle){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.a = {
            'x': x,
            'y': y
        }
        this.b = {
            'x': this.x + this.width/2,
            'y': this.y - this.height
        }
        this.c = {
            'x': this.x + this.width,
            'y': this.y
        }
        this.strokeStyle = strokeStyle;
        this.fillStyle = fillStyle;
    }

    setPos(x, y){
        this.x = x;
        this.y = y

        this.a.x = this.x;
        this.a.y = this.y;

        this.b.x = this.x + 40;
        this.b.y = this.y - 40;

        this.c.x = this.x + 80;
        this.c.y = this.y;
    }
}

class Text{
    constructor(x, y, text, font, strokeStyle, fillStyle){
        this.x = x;
        this.y = y;
        this.strokeStyle = strokeStyle;
        this.fillStyle = fillStyle;
        this.text = text;
        this.font = font;
    }
}

class Painter2D{
    constructor(canvas){
        this.canvas = canvas;
    }

    clear(){
        this.canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    }

    draw(element){
        let canvasContext = this.canvas.getContext("2d");
        canvasContext.beginPath();
        
        canvasContext.strokeStyle = element.strokeStyle;
        canvasContext.fillStyle = element.fillStyle;

        if(element.hasOwnProperty('text')){
            // It's a text
            canvasContext.font = element.font;
            canvasContext.fillText(element.text, element.x, element.y);
        }
        else if(element.hasOwnProperty('radius')) {
            // It's an arc
            canvasContext.fillArc(element.x, element.y, element.radius, 0, Math.PI*2);
        }
        else if(element.hasOwnProperty('a') && element.hasOwnProperty('b') && element.hasOwnProperty('c')) {
            // It's a triangle
            ctx.moveTo(element.a.x, element.a.y);
            ctx.lineTo(element.b.x, element.b.y);
            ctx.lineTo(element.c.x, element.c.y);
            ctx.fill();
        }
        else{
            // It's a rectangle
            canvasContext.fillRect(element.x, element.y, element.width, element.height);
        }
          
        canvasContext.closePath();
    }
}

class Player{
    constructor(id = 0, score = 0){
        this.id = id;
        this.score = score;
    }
}

class Game{
    constructor(players = [], activePlayerId = 0){
        this.players = players;
        this.activePlayerId = activePlayerId;
    }

    newPlayer(){
        let newPlayer = new Player;
        newPlayer.id = this.players.length;
        this.players.push(newPlayer);

        return this.players[newPlayer.id];
    }

    getActivePlayer(){
        return this.players[this.activePlayerId];
    }

    changeActivePlayer(){
        let nextId = this.activePlayerId + 1;
        if(nextId < this.players.length){
            this.activePlayerId = nextId;
        }
        else{
            this.activePlayerId = 0;
        }
        return  this.getActivePlayer();
    }
}
