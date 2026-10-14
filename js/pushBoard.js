function pushBoard(pos, isPlayer) {
    const row = Math.floor((pos - 1) / 5);
    const col = (pos - 1) % 5;
    GameState.board[row][col] = isPlayer ? 'X' : 'O';
}
