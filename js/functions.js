function nonRepeatNumMatrix(width, height, start, step) {
    let matrix = [];

    let availableValues = genAscSequence(start, step, width*height);
    mix(availableValues);
    matrix = explodeToMatrix(availableValues, width, height);
    console.log(matrix);
    return matrix;
}

function squareSudokuMatrix(start, step, order) {
    let matrix = [];

    let positiveHalfBase = genAscSequence(start, step, order/2);
    let negativeHalfBase = positiveHalfBase.map(val => {
        return -val;
    });

    mix(positiveHalfBase);
    mix(negativeHalfBase);

    let base = crissCross(positiveHalfBase, negativeHalfBase);

    matrix = simmetricMatrix(base);

    mixRows(matrix);
    console.log(matrix);
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

function crissCross(arr1, arr2) {
    newArr = [];

    for(let i = 0, length = arr1.length; i < length; i++) {
        newArr.push(arr1[i]);
        newArr.push(arr2[i]);
    }

    return newArr
}

function simmetricMatrix(base) {
    let matrix = [];

    for(let i = 0, order = base.length; i < order; i++) {
        matrix.push(base.slice());
        let shiftedElement = base.shift();
        base.push(shiftedElement);
    }

    return matrix;
}

function mixRows(matrix) {
    let oldMatrix = matrix.splice(0);
    let indexes = [];

    for(let i = 0, length = oldMatrix.length; i < length; i++) {
        indexes.push(i);
    }
    mix(indexes);

    indexes.forEach(i => {
        matrix.push(oldMatrix[i]);
    })
}