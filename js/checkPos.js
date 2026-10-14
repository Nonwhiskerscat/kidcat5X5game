function checkPos(pos) {
    const row = Math.floor((pos - 1) / 5);
    const col = (pos - 1) % 5;
    return GameState.board[row][col] === ' ';
}
