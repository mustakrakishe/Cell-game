class Field{
    constructor(width, height, x, y, matrix, cells = []){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.cells = cells;
    }

    getCell(row, col){
        return this.cells[row][col];
    }

    setCell(cell, row, col){
        if(row > this.cells.length - 1){
            for(let r = this.cells.length - 1; r < row; r++) {
                this.cells.push([]);
            }
        }
        
        if(col > this.cells[row].length - 1){
            for(let c = this.cells[row].length - 1; c < col; c++) {
                this.cells[row].push(null);
            }
        }

        this.cells[row][col] = cell;
        return this.getCell(row, col);
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
    constructor(width, height, x, y, strokeStyle, fillStyle, point, status, content){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.strokeStyle = strokeStyle;
        this.fillStyle = fillStyle;
        this._point = point;
        this._status = status;
        this.content = content;
    }

    point(val){
        if(typeof(val) != 'undefined') {
            this._point = val;
        }
        return this._point;
    }
    
    status(val){
        if(typeof(val) != 'undefined') {
            this._status = val;

            switch(val){
                case 0:
                    // block
                    this.fillStyle = '#eee';
                    break;
    
                case 1:
                    // Make anavailable for current player
                    this.fillStyle = 'rgb(207, 207, 207)';
                    break;
    
                case 2:
                    // A cell adds it's point to player score
                    this.fillStyle = 'rgba(21, 182, 21, 100)';
                    break;
    
                case 3:
                    // A cell subtracts it's point from player score
                    this.fillStyle = 'rgba(255, 140, 140, 100)';
                    break;
    
            }
        }
        
        return this._status;        
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
    constructor(id, score){
        this.id = id;
        this.score = score;
    }
}

class Game{
    constructor(players = [], activePlayerId = 0){
        this.players = players;
        this._activePlayerId = activePlayerId;
    }

    activePlayerId(id) {

        if(typeof(id) != 'undefined') {
            if(id == 'next') {
                id = this._activePlayerId + 1;

                if(id >= this.players.length){
                    id = 0;
                }
            }

            this._activePlayerId = id;
        }
        return this._activePlayerId;
    }

    addPlayer(player) {
        let newId = this.players.length;
        player.id = newId;
        this.players.push(player);

        return this.players[newId];
    }

    actCell(cell) {
        switch(cell.status()) {
            case 2:
                // Add cell point to player's score
                // and block a cell
                this.players[this._activePlayerId].score += cell.point();
                cell.status(0);
                break;

            case 3:
                // Subtract cell point from player's score
                // and block a cell
                this.players[this._activePlayerId].score -= cell.point();
                cell.status(0);
                break;

            default:
        }
    }

    concatPlayerScore(playerId, val) {
        player.score
    }
}
