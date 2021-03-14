function mouseClickHandler(e) {
    let canvasMouseX = e.clientX - canvas.offsetLeft;
    let canvasMouseY = e.clientY - canvas.offsetTop;

    mouseInField = isInField(canvasMouseX, canvasMouseY, field);
    if(mouseInField){
        // get muse coordinates, relative of the field
        fieldMouseX = canvasMouseX - field.x;
        fieldMouseY = canvasMouseY - field.y;
        
        let selectedRow = Math.floor(fieldMouseY/(field.height/field.cellPerSide));
        let selectedCol = Math.floor(fieldMouseX/(field.width/field.cellPerSide));

        let term = field.cells[selectedRow][selectedCol].point;
        
        player = game.getActivePlayer();
        player.score += term;
    
        let acativePlayer = game.changeActivePlayer();
        if(acativePlayer.id){
            playerPointer.setPos((canvas.width + (field.x + field.width))/2 - playerPointer.width/2, playerPointer.y);
        }
        else{
            playerPointer.setPos(field.x/2 - playerPointer.width/2, playerPointer.y);
        }
    }
}

function isInField(x, y, field){
    let XisInRange = field.x < x && x < (field.x + field.width);
    let YisInRange = field.y < y && y < (field.y + field.height);

    return XisInRange && YisInRange;
}