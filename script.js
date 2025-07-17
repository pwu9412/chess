// script.js
document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const currentPlayerDisplay = document.getElementById('current-player');
    const resetButton = document.getElementById('reset-btn');
    
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // 勝利條件（所有可能的連線方式）
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // 橫排
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // 直排
        [0, 4, 8], [2, 4, 6]             // 斜線
    ];

    // 處理玩家點擊格子
    function handleCellClick(e) {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        // 如果格子已經有值，或遊戲已結束，則不處理
        if (gameState[clickedCellIndex] !== '' || !gameActive) return;

        // 更新遊戲狀態和介面
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        // 檢查是否勝利
        checkWin();
        
        // 切換玩家
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        currentPlayerDisplay.textContent = currentPlayer;
    }

    // 檢查勝利條件
    function checkWin() {
        let roundWon = false;

        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') continue;

            if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            alert(`玩家 ${currentPlayer} 勝利！`);
            gameActive = false;
            return;
        }

        // 檢查平手
        if (!gameState.includes('')) {
            alert('平手！');
            gameActive = false;
        }
    }

    // 重置遊戲
    function resetGame() {
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayerDisplay.textContent = currentPlayer;
        cells.forEach(cell => cell.textContent = '');
    }

    // 監聽事件
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
});
