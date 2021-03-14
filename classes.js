class Shape{
    constructor(
        x = 0,
        y = 0,

        strokeStyle = '#eee',
        fillStyle = '#eee',
        
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
        x,
        y,
        width = 10,
        height = 10,
        strokeStyle,
        fillStyle
    ){
        super(x, y, strokeStyle, fillStyle);
        this.width = width;
        this.height = height;
    }
}

class Squere extends Rectangle{
    constructor(
        x,
        y,
        width = 10,
        strokeStyle,
        fillStyle
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
        x,
        y,
        width = 500,
        strokeStyle,
        fillStyle,
        cellPerSide = 10,
        cellPadding = 5,
        cells = []
    ){
        super(x, y, width, strokeStyle, fillStyle);
        this.cellPerSide = cellPerSide;
        this.cellPadding = cellPadding;
        this.cells = cells;
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
            else if(elementType == 'rectangle'){
                canvasContext.rect(element.x, element.y, element.width, element.height);
            }
            
            canvasContext.stroke();
            canvasContext.fill();
        }
          
        canvasContext.closePath();
    }
}
