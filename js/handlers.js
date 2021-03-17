function mouseClickHandler(e) {
    // Get mause coordinates, relative to the canvas
    let canvasMouseX = e.clientX - canvas.offsetLeft;
    let canvasMouseY = e.clientY - canvas.offsetTop;

    if(isInField(canvasMouseX, canvasMouseY, field)){
        // Get mause coordinates, relative to the field
        fieldMouseX = canvasMouseX - field.x;
        fieldMouseY = canvasMouseY - field.y;
        
        // Get selected cell
        let selectedRow = Math.floor(fieldMouseY/(field.height/field.cellPerSide));
        let selectedCol = Math.floor(fieldMouseX/(field.width/field.cellPerSide));
        let selectedCell = field.cells[selectedRow][selectedCol];
        
        // If a cell is unblocked
        if(selectedCell.status === 1){
            // Block selected cell
            selectedCell.setStatus(0);
            
            // change active player score
            let term = selectedCell.point;
            let player = game.getActivePlayer();
            // game.processCell(cell);
            player.score += term;

            if(player.score >= 200){
                let winner = 'Player 1';
                if(player.id){
                    winner = 'Player 2';
                }
                alert(winner + ' победил!');
                document.location.reload();
            }

            // Change active player
            let acativePlayer = game.changeActivePlayer();
            let newPlayerPointerX = 0;

            if(acativePlayer.id){
                // Player2
                newPlayerPointerX = (canvas.width + (field.x + field.width))/2 - playerPointer.width/2;

                // Change available cells
                field.cells.forEach((row, rowNum) => {
                    let status = 2;
                    if(rowNum === selectedRow) {
                        status = 1;
                    }

                    row.forEach(cell => {
                        if(cell.status !== 0){
                            cell.setStatus(status);
                        }
                    });
                });
            }
            else{
                // Player1
                newPlayerPointerX = field.x/2 - playerPointer.width/2;

                // Change available cells
                field.cells.forEach(row => {

                    row.forEach((cell, colNum) => {
                        let status = 2;
                        if(colNum === selectedCol) {
                            status = 1;
                        }

                        if(cell.status !== 0){
                            cell.setStatus(status);
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