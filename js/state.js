// 전역 게임 상태 관리
const GameState = {
    board: [
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ']
    ],
    winCells: [],

    resetBoard() {
        for (let r = 0; r < 5; r++)
            for (let c = 0; c < 5; c++)
                this.board[r][c] = ' ';
        this.winCells = [];
    }
};
