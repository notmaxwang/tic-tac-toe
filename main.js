/*----- constants -----*/
const COLORS = {
    '0': 'white',
    '1': 'purple',
    '-1': 'orange'
}

const WINSTATE = [
    [[0,0],[0,1],[0,2]],
    [[1,0], [1,1], [1,2]],
    [[2,0], [2,1], [2,2]],
    [[0,0], [1,0], [2,0]],
    [[0,1], [1,1], [2,1]],
    [[0,2],[1,2], [2,2]],
    [[0,0], [1,1], [2,2]],
    [[0,2], [1,1], [2,0]]
]

/*----- state variables -----*/
let board;
let turn;
let winner;


/*----- cached elements  -----*/
const cell00 = 'c0r0';
const cell01 = 'c0r1';
const cell02 = 'c0r2';
const cell10 = 'c1r0';
const cell11 = 'c1r1';
const cell12 = 'c1r2';
const cell20 = 'c2r0';
const cell21 = 'c2r1';
const cell22 = 'c2r2';

const messageEl = document.querySelector('h1');
const playAgainBtn = document.querySelector('button');

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleClick);

/*----- functions -----*/
init();

function init() {
    board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    turn = 1;
    winner = null;
    render();
}

function render() {
    renderBoard();
    renderMessage();
    renderControls();
}

function renderBoard() {
    board.forEach(function(colArr, colIdx) {
        colArr.forEach(function(cellVal, rowIdx) {
            const cellId = `c${colIdx}r${rowIdx}`;
            const cellEl = document.getElementById(cellId);
            cellEl.style.backgroundColor = COLORS[cellVal];
        });
    });
}

function renderMessage() {
    if (winner === 'T') {
        messageEl.innerText = "It's a Tie!!";
    } else if (winner) {
        messageEl.innerHTML = `<span style="color: ${COLORS[winner]}">${COLORS[winner].toUpperCase()}</span> Wins!!`;
    } else {
        messageEl.innerHTML = `<span style="color: ${COLORS[turn]}">${COLORS[turn].toUpperCase()}</span>'s Turn`;
    }
}

function renderControls() {
    playAgainBtn.style.visiility = winner ? 'visible': 'hidden';
}

function handleClick(evt) {
    console.log(evt.target);
}
