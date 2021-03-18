function mouseClickHandler(e) {
    
    // Get mause coordinates, relative to the canvas
    let canvasMouseX = e.clientX - canvas.offsetLeft;
    let canvasMouseY = e.clientY - canvas.offsetTop;

    if(isInField(canvasMouseX, canvasMouseY, field)){
        // Get mause coordinates, relative to the field
        fieldMouseX = canvasMouseX - field.x;
        fieldMouseY = canvasMouseY - field.y;
        
        // Get selected cell
        let selectedRow = Math.floor(fieldMouseY/(field.height/field.cells.length));
        let selectedCol = Math.floor(fieldMouseX/(field.width/field.cells[0].length));
        let selectedCell = field.getCell(selectedRow, selectedCol);
        
        // If a cell is unblocked
        if(selectedCell.status() > 1){
            game.actCell(selectedCell);

            // Change active player
            let acativePlayerId = game.activePlayerId('next');
            let newPlayerPointerX = 0;

            if(acativePlayerId){
                // Player2
                newPlayerPointerX = (canvas.width + (field.x + field.width))/2 - playerPointer.width/2;

                // Change available cells
                field.cells.forEach((row, rowNum) => {
                    let status = 1;
                    if(rowNum === selectedRow) {
                        status = 2;
                    }

                    row.forEach(cell => {
                        if(cell.status() > 0){
                            cell.status(status);
                        }
                    });
                });
            }
            else{
                // Player1
                newPlayerPointerX = field.x/2 - playerPointer.width/2;

                // Change available cells
                field.cells.forEach((row, rowNum) => {

                    row.forEach((cell, colNum) => {
                        let status = 1;
                        if(colNum === selectedCol) {
                            status = 2;
                        }

                        if(cell.status() > 0){
                            cell.status(status);
                        }
                    });
                });
            }
            playerPointer.setPos(newPlayerPointerX, playerPointer.y);
        }
    }
}

function isInField(x, y, field){
    let XisInRange = field.x < x && x < (field.x + field.width);
    let YisInRange = field.y < y && y < (field.y + field.height);

    return XisInRange && YisInRange;
}