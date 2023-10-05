const board = document.getElementById('board');
        let currentPlayer = 'X';
        let gameOver = false;

        function checkWin() {
            const cells = document.querySelectorAll('.cell');
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];

            for (const pattern of winPatterns) {
                const [a, b, c] = pattern;
                if (cells[a].textContent &&
                    cells[a].textContent === cells[b].textContent &&
                    cells[a].textContent === cells[c].textContent) {
                    gameOver = true;
                    cells[a].classList.add('winner');
                    cells[b].classList.add('winner');
                    cells[c].classList.add('winner');
                    alert(`Player ${currentPlayer} wins!`);
                }
            }
        }

        function checkDraw() {
            const cells = document.querySelectorAll('.cell');
            if (!Array.from(cells).some(cell => cell.textContent === '')) {
                gameOver = true;
                alert("It's a draw!");
            }
        }

        function handleClick(e) {
            if (!gameOver && e.target.textContent === '') {
                e.target.textContent = currentPlayer;
                e.target.classList.add(currentPlayer.toLowerCase()); // Add class 'x' or 'o'
                checkWin();
                checkDraw();
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }

        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', handleClick);
            board.appendChild(cell);
        }
        const restartButton = document.getElementById('restartButton');
        restartButton.addEventListener('click', () => {
            resetGame();
            restartButton.style.display = 'block';
        });

        function resetGame() {
            const cells = document.querySelectorAll('.cell');
            cells.forEach(cell => {
                cell.textContent = '';
                cell.classList.remove('winner', 'x', 'o');
            });
            gameOver = false;
            currentPlayer = 'X';
        }