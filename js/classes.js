class Field{
    constructor(width, height, x, y, matrix, cells = []){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.cells = cells;
    }

    cell(row, col, cell){
        if(typeof(cell) != 'undefined') {
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
        }
        
        return this.cells[row][col];
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
                    this.fillStyle = 'rgb(255, 140, 140)';
                    break;
    
                case 3:
                    // A cell subtracts it's point from player score
                    this.fillStyle = 'rgb(0, 255, 255)';
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
        this.position(x, y);
        this.strokeStyle = strokeStyle;
        this.fillStyle = fillStyle;
    }

    position(x, y) {
        if(typeof(x) != 'undefined' && typeof(y) != 'undefined') {
            this.x = x;
            this.y = y;
            this.#refreshVertices(this.x, this.y);
        }

        let position = {
            'x': this.x,
            'y': this.y
        };
        return position;
    }

    #refreshVertices(x, y) {
        this.a = {
            'x': this.x,
            'y': this.y
        }

        this.b = {
            'x': this.x + this.width/2,
            'y': this.y - this.height
        }

        this.c = {
            'x': this.x + this.width,
            'y': this.y
        }
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
}
