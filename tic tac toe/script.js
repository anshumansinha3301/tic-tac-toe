const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill('');

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    if (gameState[cellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.innerText = currentPlayer;
    cell.style.color = currentPlayer === 'X' ? '#ff6b6b' : '#4b7bec';

    if (checkWinner()) {
        message.innerText = `${currentPlayer} has won!`;
        gameActive = false;
    } else if (gameState.every(cell => cell !== '')) {
        message.innerText = 'Draw!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.innerText = `It's ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

function resetGame() {
    gameState = Array(9).fill('');
    cells.forEach(cell => {
        cell.innerText = '';
        cell.style.color = '#333';
    });
    currentPlayer = 'X';
    gameActive = true;
    message.innerText = `It's ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

message.innerText = `It's ${currentPlayer}'s turn`;
