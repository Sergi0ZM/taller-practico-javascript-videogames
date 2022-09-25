const canvas = document.querySelector('#game');
const game = canvas.getContext('2d')
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result');

let canvasSize;
let elementSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = {
    x: undefined,
    y: undefined,
};
const giftPosition = {
    x: undefined,
    y: undefined,
};
let enemyPositions = [];

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize)

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.7;
    } else {
        canvasSize = window.innerHeight * 0.7;
    }

    canvasSize = Number(canvasSize.toFixed(0));

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

     elementSize = canvasSize / 10;

     playerPosition.x = undefined;
     playerPosition.y = undefined;

    startGame();
}


function startGame() {

    game.font = elementSize * 0.8 + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[level];

    if(!map) {
        gameWin();
        return;
    }

    if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime,100);
        showRecord();
    }

    const mapRows = map.trim().split('\n');
    const mapRowsCols = mapRows.map(row => row.trim().split(''));

    showLives();

    enemyPositions = [];
    game.clearRect(0,0,canvasSize,canvasSize);

    mapRowsCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementSize * (colI + 1);
            const posY = elementSize * (rowI + 1);

            if (col == 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                    console.log({playerPosition});
                }
            } else if (col == 'I') {
                giftPosition.x = posX;
                giftPosition.y = posY;
            } else if (col == 'X') {
                enemyPositions.push({
                    x: posX,
                    y: posY
                });
            }
            game.fillText(emoji, posX, posY);
        });
    });

    movePlayer();
}

function movePlayer() {
    const giftCollisionX = playerPosition.x.toFixed(2) == giftPosition.x.toFixed(2);
    const giftCollisionY = playerPosition.y.toFixed(2) == giftPosition.y.toFixed(2);

    const giftCollision = giftCollisionX && giftCollisionY;

    if (giftCollision) {
        levelWin();
    }

    const enemyCollision = enemyPositions.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(2) == playerPosition.x.toFixed(2);
        const enemyCollisionY = enemy.y.toFixed(2) == playerPosition.y.toFixed(2);
        return enemyCollisionX && enemyCollisionY;
    });

    if (enemyCollision) {
        levelFail();
    }

    
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelWin() {
    console.log("Subiste de nivel");
    level++;
    startGame();
}
 function levelFail() {

    lives--;

    console.log(lives)
    if (lives <= 0 ) {
        level = 0;
        lives = 3;
        timeStart = undefined;
    }

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function gameWin() {
    console.log('Terminaste el juego!');
    clearInterval(timeInterval);

    const recordTime = localStorage.getItem('record_time');
    const playerTime = Date.now() - timeStart;


    if (recordTime) {
        if (recordTime >= playerTime) {
            localStorage.setItem('record_time', playerTime);
            pResult.innerHTML = 'SUPERASTE EL RECORD!'
        } else {
           pResult.innerHTML = 'No superaste el record';
        }
    } else {
        localStorage.setItem('record_time', playerTime);
        pResult.innerHTML = 'Trata de superar tu tiempo!';
    }
    console.log({recordTime, playerTime});
}

// function showLives() {
//     const heartsArray = Array(lives).fill(emojis['HEART']);
//     // console.log(heartsArray);
//     spanLives.innerHTML = "";
//     heartsArray.forEach(heart => spanLives.append(heart));
// }

function showLives() {
    spanLives.innerHTML = emojis["HEART"].repeat(lives)
}

function showTime(){
    spanTime.innerHTML = '0:0:0';
    timePlayer = Date.now() - timeStart;
    spanTime.innerHTML = formatTime(timePlayer);

}

function showRecord() {
    spanRecord.innerHTML = '0:0:0';
    spanRecord.innerHTML = formatTime(localStorage.getItem('record_time'));
}

function formatTime(ms) {
    const ml = parseInt(ms/10) % 10;
    const seg = parseInt(ms/1000) % 60;
    const min = parseInt(ms/60000) % 60;
    const mlStr = `0${ml}`.slice(-2);
    const segStr = `0${seg}`.slice(-2);
    const minStr = `0${min}`.slice(-2);
    return `${minStr}:${segStr}:${mlStr}`;
}

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event) {
    if(event.key == 'ArrowUp') {
        moveUp();
    } else if (event.key == 'ArrowLeft') {
        moveLeft();
    } else if (event.key == 'ArrowRight') {
        moveRight();
    } else if (event.key == 'ArrowDown') {
        moveDown();
    }
}
function moveUp() {
    console.log("Me quiero mover hacia arriba");
    if ((playerPosition.y - elementSize) < elementSize) {
        console.log("OUT")
    } else {
        playerPosition.y -= elementSize;
        startGame();
    }
}
function moveLeft() {
    console.log("Me quiero mover hacia la izquierda");
    if ((playerPosition.x - elementSize) < elementSize) {
        console.log("OUT")
    } else {
        playerPosition.x -= elementSize;
        startGame();
    }
}
function moveRight() {
    console.log("Me quiero mover hacia la derecha");
    if ((playerPosition.x + elementSize) > canvasSize) {
        console.log("OUT")
    } else {
        playerPosition.x += elementSize;
        startGame();
    }
}
function moveDown() {
    console.log("Me quiero mover hacia abajo");
    if ((playerPosition.y + elementSize) > canvasSize) {
        console.log("OUT")
    } else {
        playerPosition.y += elementSize;
        startGame();
    }
}

    // for (let i = 1; i <= 10; i++) {
    //     for (let j = 1; j <= 10; j++) {
    //         game.fillText(emojis[mapRowsCols[i-1][j -1]], elementSize * j, elementSize * i);
    //     }
    // }
    // game.fillStyle='purple';
    // game.fillRect(0, 0, 100, 100);


