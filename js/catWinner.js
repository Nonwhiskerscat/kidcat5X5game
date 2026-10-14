function catWinner(catWin) {
    const board = GameState.board;
    const symbol = catWin ? 'X' : 'O';
    let diagonalCountOne = 0;
    let diagonalCountSec = 0;

    for (let i = 0; i < 5; i++) {
        let horizontalCount = 0;
        let verticalCount = 0;

        for (let j = 0; j < 5; j++) {
            if (board[i][j] === symbol) {
                horizontalCount++;
                GameState.winCells.push(i, j);
            }
        }
        if (horizontalCount === 5) return true;
        GameState.winCells = [];

        for (let j = 0; j < 5; j++) {
            if (board[j][i] === symbol) {
                verticalCount++;
                GameState.winCells.push(j, i);
            }
        }
        if (verticalCount === 5) return true;
        GameState.winCells = [];
    }

    for (let i = 0; i < 5; i++) {
        if (board[i][i] === symbol) {
            diagonalCountOne++;
            GameState.winCells.push(i, i);
        }
    }
    if (diagonalCountOne === 5) return true;
    GameState.winCells = [];

    for (let i = 4, j = 0; i > -1; i--, j++) {
        if (board[i][j] === symbol) {
            diagonalCountSec++;
            GameState.winCells.push(i, j);
        }
    }
    if (diagonalCountSec === 5) return true;
    GameState.winCells = [];

    return false;
}
