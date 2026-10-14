function catDraw() {
    const board = GameState.board;
    for (let r = 0; r < 5; r++)
        for (let c = 0; c < 5; c++)
            if (board[r][c] === ' ') return false;
    return true;
}
