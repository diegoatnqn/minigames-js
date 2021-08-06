const grid = document.querySelector('.grid');
const scoreDisplay = document.getElementById('score');
const width = 8;
const squares = [];
let score = 0;
const candyColors=['red','yellow','orange','blue','purple','green']
//Crear pantalla

function createBoard() {
    for (let i = 0; i < width * width; i++) {
        const square = document.createElement('div');
        square.setAttribute('draggable', true);
        square.setAttribute('id', i);
        let randomColor = Math.floor( Math.random() * (candyColors.length));
        square.style.backgroundColor = candyColors[randomColor];
        grid.appendChild(square);
        squares.push(square);
    }
}
createBoard()


//Draggable cuadrados
let colorBeingReplaced;
let colorBeingDragged;
let squareIdBeingDragged;
let squareIdBeingReplaced;

squares.forEach(square => square.addEventListener('dragstart', dragStart))
squares.forEach(square => square.addEventListener('dragend', dragEnd))
squares.forEach(square => square.addEventListener('dragover', dragOver))
squares.forEach(square => square.addEventListener('dragenter', dragEnter))
squares.forEach(square => square.addEventListener('drageleave', dragLeave))
squares.forEach(square => square.addEventListener('drop', dragDrop))

function dragStart() {
    colorBeingDragged = this.style.backgroundColor
    squareIdBeingDragged = parseInt(this.id)
    // this.style.backgroundImage = ''
}

function dragOver(e) {
    e.preventDefault()
}

function dragEnter(e) {
    e.preventDefault()
}

function dragLeave() {
    this.style.backgroundImage = ''
}

function dragDrop() {
    colorBeingReplaced = this.style.backgroundColor
    squareIdBeingReplaced = parseInt(this.id)
    this.style.backgroundColor = colorBeingDragged
    squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced
}
function dragEnd() {
    //Jugada valida?
    let validMoves = [squareIdBeingDragged - 1, squareIdBeingDragged - width, squareIdBeingDragged + 1, squareIdBeingDragged + width];
    let validMove = validMoves.includes(squareIdBeingReplaced)

    if (squareIdBeingReplaced && validMove) {
        squareIdBeingReplaced = null
    } else if (squareIdBeingReplaced && !validMove) {
        squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced
        squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged
    } else {
        squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged
    }
    
}

//Caida de cuadrados
function moveDown() {
    for (let i = 0; i <= 55; i++) {
        if (squares[i + width].style.backgroundColor === '') {
            squares[i + width].style.backgroundColor = squares[i].style.backgroundColor;
            squares[i].style.backgroundColor = '';

            const primeraFila = [0, 1, 2, 3, 4, 5, 6, 7];
            const isPrimeraFila = primeraFila.includes(i);

            if (isPrimeraFila && squares[i].style.backgroundColor === '') {
                let randomColor = Math.floor(Math.random() * (candyColors.length));
                squares[i].style.backgroundColor = candyColors[randomColor]
            }
        }
    }
}
//Fin caida de cuadrados


//Chequear 3

//Fila de tres
function checkThree() {
    for (let i = 0; i < 61; i++) {
        let rowOfThree = [i, i + 1, i + 2]
        let decidedColor = squares[i].style.backgroundColor;
        const isBlank = squares[i].style.backgroundColor === '';

        const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]

        if (notValid.includes(i)) continue

        if (rowOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
            score += 3;
            scoreDisplay.innerHTML = score;
            rowOfThree.forEach(index => {
                squares[index].style.backgroundColor=''
            })
        }
    }
}
checkThree()

//columna de tres
function checkThreeColumn() {
    for (let i = 0; i <= 47; i++) {
        let columnOfThree = [i, i + width, i + width* 2]
        let decidedColor = squares[i].style.backgroundColor;
        const isBlank = squares[i].style.backgroundColor === '';

        if (columnOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
            score += 3;
            scoreDisplay.innerHTML = score;
            columnOfThree.forEach(index => {
                squares[index].style.backgroundColor = ''
            })
        }
    }
}
checkThreeColumn()

//CUATRO
function checkFour() {
    for (let i = 0; i < 60; i++) {
        let rowOfFour = [i, i + 1, i + 2,i+3]
        let decidedColor = squares[i].style.backgroundColor;
        const isBlank = squares[i].style.backgroundColor === '';

        const notValid = [5,6, 7, 13,14, 15,21, 22, 23,29, 30, 31,37, 38, 39,45, 46, 47,53, 54, 55]

        if (notValid.includes(i)) continue

        if (rowOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
            score += 4;
            scoreDisplay.innerHTML = score;
            rowOfFour.forEach(index => {
                squares[index].style.backgroundColor = ''
            })
        }
    }
}

checkFour();
//columna de tres
function checkFourColumn() {
    for (i = 0; i < 39; i++) {
        let columnOfFour = [i, i + width, i + width * 2, i + width * 3]
        let decidedColor = squares[i].style.backgroundColor
        const isBlank = squares[i].style.backgroundColor === ''

        if (columnOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
            score += 4
            scoreDisplay.innerHTML = score;
            columnOfFour.forEach(index => {
                squares[index].style.backgroundColor = ''
            })
        }
    }
}

checkFourColumn();
//FIN CUATRO

window.setInterval(function () {
    
    checkFour();
    checkFourColumn();
    checkThree();
    checkThreeColumn();
    moveDown();
}, 100)