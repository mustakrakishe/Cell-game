class Shape{
    constructor(
        x = 0,
        y = 0,

        strokeStyle = 'black',
        fillStyle = 'black',
        
        form = 'rectangle'
    ){
        this.x = x;
        this.y = y;

        this.strokeStyle = strokeStyle;
        this.fillStyle = fillStyle;

        this.form = form;
    }
}

class Rectangle extends Shape{
    constructor(
        x = null,
        y = null,
        width = 10,
        height = 10,
        strokeStyle = null,
        fillStyle = null
    ){
        super(x, y, strokeStyle, fillStyle);
        this.width = width;
        this.height = height;
    }
}

class Squere extends Rectangle{
    constructor(
        x = null,
        y = null,
        width = 10,
        strokeStyle = null,
        fillStyle = null
    ){
        super(x, y, width, width, strokeStyle, fillStyle);
    }
}

class Text extends Shape{
    constructor(
        x = null,
        y = null,
        text = 'Simple Text',
        font = '12px Arial',
        strokeStyle = null,
        fillStyle = null
    ){
        super(x, y, strokeStyle, fillStyle);
        this.text = text;
        this.font = font;
    }
}

class Cell extends Squere{
    constructor(

        x = null,
        y = null,
        width = 40,
        strokeStyle = null,
        fillStyle = null,
        point = 0
    ){
        super(x, y, width, width, strokeStyle, fillStyle);
        this.point = point;
    }

    setPoint(point){
        this.point = point;
        let color = '';

        if(point > 0) {
            color = 'green';
        }
        else if(point < 0){
            color = 'red';
        }

        this.fillStyle = color;
    }
}

class Field extends Squere{
    constructor(
        x = null,
        y = null,
        width = 500,
        strokeStyle = null,
        fillStyle = null,
        cellPerSide = 10,
        cellPadding = 5,
        cells = []
    ){
        super(x, y, width, width, strokeStyle, fillStyle);
        this.cellPerSide = cellPerSide;
        this.cellPadding = cellPadding;
        this.cells = cells;
        this.fill();
    }

    fill(){
        var availablePointBases = [];
        for(var cellNum = 0; cellNum < this.cellPerSide/2; cellNum++){
            availablePointBases.push((cellNum + 1) * 10);
        }

        for(var rowNum = 0; rowNum < this.cellPerSide; rowNum++) {
            this.cells[rowNum] = Array(this.cellPerSide);

            var offset = 0;
            this.cells[rowNum] = this.#generateHalfRow(this.cells[rowNum], rowNum, offset, availablePointBases.slice());
            
            offset = 1;
            let availableNegativePoints = availablePointBases.map((val) => {
                return -val;
            });
            this.#generateHalfRow(this.cells[rowNum], rowNum, offset, availableNegativePoints.slice());
        }
    }

    #generateHalfRow(rowCells, rowNum, offset, points) {

        for(let colNum = offset; colNum < rowCells.length; colNum += 2) {
            let cell = new Cell;
            cell.x = (cell.width + this.cellPadding) * colNum;
            cell.y = (cell.width + this.cellPadding) * rowNum;
            cell.width = 40;
            // let randNum = this.#getRandomIntInclusive(0, points.length - 1);
            // let point = points.splice(randNum, 1);
            // cell.setPoint(point);

            rowCells[colNum] = cell;
        }
    }

    #getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
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

        let elementType = element.form;
        if(elementType == 'Text'){
            canvasContext.font = element.font;
            canvasContext.fillText(element.text, element.x, element.y);
        }
        else{
            if(elementType == 'Circle'){
                canvasContext.arc(element.x, element.y, element.radius, 0, Math.PI*2);
            }
            else if(elementType == 'Rectangle'){
                canvasContext.rect(element.x, element.y, element.width, element.height);
            }
            
            canvasContext.stroke();
            canvasContext.fill();
        }
          
        canvasContext.closePath();
    }
}
