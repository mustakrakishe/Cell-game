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
        // console.log('');
        // console.log('player1 (id: ' + player1.id + '; score: ' + player1.score + ')');
        // console.log('player2 (id: ' + player2.id + '; score: ' + player2.score + ')');
    
        game.changeActivePlayer();
    }
}

function isInField(x, y, field){
    let XisInRange = field.x < x && x < (field.x + field.width);
    let YisInRange = field.y < y && y < (field.y + field.height);

    return XisInRange && YisInRange;
}