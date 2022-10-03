/*----- constants -----*/
const COLORS = {
    '0': 'white',
    '1': 'purple',
    '-1': 'orange'
}

const GRIDSIZE = 9;

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
let gridTaken;


/*----- cached elements  -----*/
const cachedBoardEl = {
    '00': document.getElementById('c0r0'),
    '01': document.getElementById('c0r1'),
    '02': document.getElementById('c0r2'),
    '10': document.getElementById('c1r0'),
    '11': document.getElementById('c1r1'),
    '12': document.getElementById('c1r2'),
    '20': document.getElementById('c2r0'),
    '21': document.getElementById('c2r1'),
    '22': document.getElementById('c2r2')
}

const messageEl = document.querySelector('h1');
const playAgainBtn = document.querySelector('button');

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleClick);
playAgainBtn.addEventListener('click', init);

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
    gridTaken = 0;
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
    
    let storeIdx = '';
    for(const key in cachedBoardEl){
        if (evt.target === cachedBoardEl[key]) {
            storeIdx = key;
            break;
        }
    }

    const colIdx = storeIdx[0];
    const rowIdx = storeIdx[1];

    if (board[colIdx][rowIdx] !== 0) {
        return;
    }


    if (winner) {
        return;
    }

    board[colIdx][rowIdx] = turn;
    turn *= -1;
    gridTaken += 1;
    winner = getWinner();

    render();
}

function getWinner() {
    for(let i = 0; i < WINSTATE.length; i++) {
        if(Math.abs(board[WINSTATE[i][0][0]][WINSTATE[i][0][1]] + 
                    board[WINSTATE[i][1][0]][WINSTATE[i][1][1]] +
                    board[WINSTATE[i][2][0]][WINSTATE[i][2][1]]) === 3) {
            return board[WINSTATE[i][0][0]][WINSTATE[i][0][1]];
        }
        
    }
    if (gridTaken === GRIDSIZE) {
        return 'T';
    }

    return null;
}


