const grid = document.querySelector('.grid');
const resultsDisplay = document.querySelector('.results');
const instruccionesText = document.getElementById('instrucciones');
const buttonRestartGame = document.getElementById('boton-restart');
let currentShooterIndex = 202;
let width = 15;
let direction = 1;
let invadersID;
let goingRight = true;
let aliensMoved = [];
let results = 0;
let level = 0;

instruccionesText.innerHTML = "Movimiento: flechas  ← → , Disparo: ↑";
buttonRestartGame.style.display = 'none';
buttonRestartGame.addEventListener('click', restartGame);
for (let i = 0; i < 225; i++) {
    const square = document.createElement('div');
    grid.appendChild(square)
}
const squares = Array.from(document.querySelectorAll('.grid div'));

var alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 13, 15, 17, 19, 21, 22, 25, 26, 28, 29
];

function draw() {
    
    for (let t = 0; t < alienInvaders.length; t++) {
        if (!aliensMoved.includes(t) && alienInvaders[t] > 0) {
            squares[alienInvaders[t]].classList.add('invader');
        }
        
    }
}
function remove() {
    
    for (let t = 0; t < alienInvaders.length; t++) {
        if(alienInvaders[t]>0)
            squares[alienInvaders[t]].classList.remove('invader');
    }
}

draw();

squares[currentShooterIndex].classList.add('shooter');

function moveShooter(e) {
    squares[currentShooterIndex].classList.remove('shooter');
    switch (e.key) {
        case 'ArrowLeft':
            if (currentShooterIndex % width !== 0) {
                currentShooterIndex -= 1;
            };
            break;
        case 'ArrowRight':
            if (currentShooterIndex % width < width - 1) {
                currentShooterIndex += 1;
            };
            break;
            
    }
    squares[currentShooterIndex].classList.add('shooter');
}
document.addEventListener('keydown', moveShooter);

function moveInvader() {
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;

    remove();
    if (rightEdge && goingRight) {
        for (let t = 0; t < alienInvaders.length; t++) {
            alienInvaders[t] += width + 1;
            direction = -1;
            goingRight = false;
        }
    }

    if (leftEdge && !goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width;
            direction = 1;
            goingRight = true;
        }
    }


    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] +=direction;
    }
    draw();

    if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
        resultsDisplay.innerHTML = 'GAME OVER: ' + results+" puntos"
        clearInterval(invadersID);
        instruccionesText.style.display = "none";
        buttonRestartGame.style.display = 'inline-block';
        buttonRestartGame.innerHTML = "Reiniciar"
        buttonRestartGame.style.backgroundColor = 'lightgreen';
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        if (alienInvaders[i] > squares.length) {
            resultsDisplay.innerHTML = 'GAME OVER: ' + results + " puntos"
            clearInterval(invadersID);
            instruccionesText.style.display = "none";
            buttonRestartGame.style.display = 'inline-block';
            buttonRestartGame.innerHTML = "Reiniciar"
            buttonRestartGame.style.backgroundColor = 'lightgreen';
        }
    }

    if (aliensMoved.length === alienInvaders.length) {
        resultsDisplay.innerHTML = "Ganaste";
        clearInterval(invadersID);
        setTimeout(newLevel, 1150);
    }
}

function newLevel() {
    level += 35;
    aliensMoved = [];
    alienInvaders = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 13, 15, 17, 19, 21, 22, 25, 26, 28, 29];
    alienInvaders = shuffle(alienInvaders);
    draw();
    console.log("LEVEL: "+level)
    invadersID = setInterval(moveInvader, (470-level));
}
function shuffle(array) {   //copio mezcla de array desde stackoverflow /6274339
    var j, x, i;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
    }
    return array;
}

invadersID = setInterval(moveInvader, 470);

function shoot(e) {
    let laserID;
    let currentLaserIndex = currentShooterIndex;
    function moveLaser() {
        squares[currentLaserIndex].classList.remove('laser');
        currentLaserIndex -= width;
        if (currentLaserIndex > 0) {
            squares[currentLaserIndex].classList.add('laser');

            if (squares[currentLaserIndex].classList.contains('invader')) {
                squares[currentLaserIndex].classList.remove('invader');
                squares[currentLaserIndex].classList.remove('laser');
                squares[currentLaserIndex].classList.add('boom');

                setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 300);
                clearInterval(laserID)

                const alienRemoval = alienInvaders.indexOf(currentLaserIndex);
                aliensMoved.push(alienRemoval);
                resultsDisplay.innerHTML = "Puntaje: "+results;
                results++;
            }
        }
        else {
            clearInterval(laserID);
        }
    }
    switch (e.key) {
        case 'ArrowUp':
            laserID = setInterval(moveLaser, 25); break;
    }
}
function restartGame() {
    results = 0;
    resultsDisplay.innerHTML = results;
    instruccionesText.style.display = "block";
    buttonRestartGame.style.display = 'none';
    remove();
    level =0;
    aliensMoved = [];
    alienInvaders = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 13, 15, 17, 19, 21, 22, 25, 26, 28];
    alienInvaders = shuffle(alienInvaders);
    draw();
    invadersID = setInterval(moveInvader, (470));
}

document.addEventListener('keyup', shoot)