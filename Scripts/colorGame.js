const grid = document.querySelector('.grid');
const resultsDisplay = document.getElementById('titulo');
const instruccionesText = document.getElementById('instrucciones');
const buttonColorChange = document.getElementById('cambiar');
const buttonRestartGame = document.getElementById('restart');
const rondaText = document.getElementById('rondas');
const alienInvaders = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const colorArray = ['purple', 'violet', 'blue', 'grey', 'yellow', '#000', '#6495ED', '#FF7F50', '#BDB76B', '#E9967A', '#1E90FF', '#FFD700', '#FF1493', '#000080', '#CD853F', '#708090', '#F5DEB3'];
const colorInvaders = ["#FF7F50", "#CD853F", "#E9967A", "blue", "grey", "#BDB76B", "#708090", "#1E90FF", "purple", "#FFD700", "#F5DEB3", "yellow", "#000080", "#000", "#FF1493", "violet", "#6495ED"];

let currentShooterIndex = 202;
let currentShooterColor;
let currentInvaderColor;
let width = 15;
let colorIt = 0;
let invaderIt = 0;
let invadersID;
let ronda = 1;
let instrucciones = "Sincroniza el cuadrado de abajo con el color de la barra!";
rondaText.innerHTML = "Ronda " + ronda;
instruccionesText.innerHTML = instrucciones;
let cuadradoShooter;
currentInvaderColor = colorInvaders[invaderIt];
buttonColorChange.addEventListener('click', changeColor);
buttonRestartGame.addEventListener('click', restartGame);
buttonRestartGame.style.display = 'none';

function changeColor() {
    if (colorIt < colorArray.length) {
        cuadradoShooter.style.backgroundColor = colorArray[colorIt];
    } else {
        colorIt = 0;
        cuadradoShooter.style.backgroundColor = colorArray[colorIt];
    }
    currentShooterColor = colorArray[colorIt];
    console.log(currentShooterColor);
    colorIt++;
}

for (let i = 0; i < 225; i++) {
    const square = document.createElement('div');
    grid.appendChild(square)
}
const squares = Array.from(document.querySelectorAll('.grid div'));
squares[currentShooterIndex].id = 'shooter';
cuadradoShooter = document.getElementById('shooter');
cuadradoShooter.classList.add('shooter');
changeColor()



draw();

function draw() {
    
    for (let t = 0; t < alienInvaders.length; t++) {
        squares[alienInvaders[t]].classList.add('invader');
        squares[alienInvaders[t]].style.backgroundColor = colorInvaders[invaderIt];
    }
}

function drawNew() {
    cuadradoShooter.style.backgroundColor = currentShooterColor;
    for (let t = 0; t < alienInvaders.length; t++) {
        squares[alienInvaders[t]].classList.add('invader');
        squares[alienInvaders[t]].style.backgroundColor = colorInvaders[invaderIt];
    }
}

function remove() {
    for (let t = 0; t < alienInvaders.length; t++) {
        squares[alienInvaders[t]].classList.remove('invader');
        squares[alienInvaders[t]].style.backgroundColor = "whitesmoke";
    }
}

function moveInvader() {
    remove();

    for (let t = 0; t < alienInvaders.length; t++) {
        alienInvaders[t] += width;
    }
    draw();
    
    if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) { //Si la linea alcanza a shooter:
        if (currentInvaderColor == currentShooterColor) {   //si el color es el mismo:
            
            newLevel();
            drawNew();

        } else {        //Si lo alcanzó pero el color no es el mismo
            resultsDisplay.innerHTML = 'GAME OVER: ' + ronda+" rondas";
            clearInterval(invadersID);
            rondaText.innerHTML = "";
            instruccionesText.innerHTML = "";
            buttonColorChange.style.display = 'none';
            buttonRestartGame.style.display = 'block';
            
        }
    }
}

function newLevel() {
    remove();
    invaderIt++;
    currentInvaderColor = colorInvaders[invaderIt];
    for (let t = 0; t < alienInvaders.length; t++) {
        alienInvaders[t] =t;
    }
    ronda++;
    rondaText.innerHTML = "Ronda " + ronda;
}

function restartGame() {
    resultsDisplay.innerHTML = 'Inicio del juego';
    instruccionesText.innerHTML = instrucciones;
    buttonColorChange.style.display = 'block';
    buttonRestartGame.style.display = 'none';
    remove();
    invaderIt = 0;
    currentInvaderColor = colorInvaders[invaderIt];
    for (let t = 0; t < alienInvaders.length; t++) {
        alienInvaders[t] = t;
    }
    ronda = 0;
    rondaText.innerHTML = "Ronda " + ronda;
    drawNew();
    invadersID = setInterval(moveInvader, 450);
}

invadersID = setInterval(moveInvader, 450);