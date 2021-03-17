function nonRepeatNumMatrix(width, height, start, step) {
    let matrix = [];

    let availableValues = genAscSequence(start, step, width*height);
    mix(availableValues);
    matrix = explodeToMatrix(availableValues, width, height);
    console.log(matrix);
    return matrix;
}

function genAscSequence(start, step, length) {
    let sequence = [];
    
    for(let i = 0; i < length; i++) {
        let val = start + step * i;
        sequence.push(val);
    }
    
    return sequence;
}

function mix(arr){
    let oldArr = arr.splice(0);

    for(let i = 0, length = oldArr.length; i < length; i++){
        let min = 0;
        let max = oldArr.length - 1;
        let random = randomInteger(min, max);
        let selectedElement = oldArr.splice(random, 1);
        arr.push(parseInt(selectedElement));
    }
}

function randomInteger(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

function explodeToMatrix(array, width, height) {
    let matrix = [];

    if(array.length >= width*height) {

        for(let r = 0, i = 0; r < height; r++) {
            let row = [];

            for(let c = 0; c < width; c++, i++) {
                row.push(array[i]);
            }
            matrix.push(row);
        }
    }

    return matrix;
}