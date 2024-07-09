document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('status');
    const resetButton = document.getElementById('resetButton');
    let currentPlayer = 'X';
    let board = Array(9).fill(null);
    let isGameActive = true;

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
        const cellIndex = parseInt(cell.getAttribute('data-index'));

        if (board[cellIndex] !== null || !isGameActive) {
            return;
        }

        board[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin()) {
            statusDisplay.textContent = `Player ${currentPlayer} wins!`;
            isGameActive = false;
        } else if (board.every(cell => cell !== null)) {
            statusDisplay.textContent = 'Draw!';
            isGameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    function checkWin() {
        return winningConditions.some(condition => {
            const [a, b, c] = condition;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    }

    function resetGame() {
        board = Array(9).fill(null);
        isGameActive = true;
        currentPlayer = 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
        cells.forEach(cell => (cell.textContent = ''));
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
});
