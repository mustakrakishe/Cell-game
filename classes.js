
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
}

class Cell{
    constructor(width, height, x, y, strokeStyle, fillStyle, point){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.strokeStyle = strokeStyle;
        this.fillStyle = fillStyle;
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
        else{
            // It's a rectangle
            canvasContext.fillRect(element.x, element.y, element.width, element.height);
        }
          
        canvasContext.closePath();
    }
}
