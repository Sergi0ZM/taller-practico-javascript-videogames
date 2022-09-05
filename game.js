const canvas = document.querySelector('#game');
const game = canvas.getContext('2d')
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

let canvasSize;
let elementSize;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize)

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

     elementSize = canvasSize / 10;

    startGame();
}


function startGame() {
    console.log({ canvasSize, elementSize});

    game.font = elementSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapRowsCols = mapRows.map(row => row.trim().split(''));
    console.log({map, mapRows, mapRowsCols});

    mapRowsCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementSize * (colI + 1);
            const posY = elementSize * (rowI + 1);
            game.fillText(emoji, posX, posY);
            console.log({ row, col});
        });
    });
}

window.addEventListener('Keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event) {
    console.log(event);
}
function moveUp() {
       console.log("Me quiero mover hacia arriba");
    }
function moveLeft() {
        console.log("Me quiero mover hacia la izquierda");
    }
function moveRight() {
        console.log("Me quiero mover hacia la derecha");
    }
function moveDown() {
        console.log("Me quiero mover hacia abajo");
    }

    // for (let i = 1; i <= 10; i++) {
    //     for (let j = 1; j <= 10; j++) {
    //         game.fillText(emojis[mapRowsCols[i-1][j -1]], elementSize * j, elementSize * i);
    //     }
    // }
    // game.fillStyle='purple';
    // game.fillRect(0, 0, 100, 100);


