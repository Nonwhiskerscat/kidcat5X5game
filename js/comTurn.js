function comTurn() {
    const board = GameState.board;

    // 빈 칸 목록 수집
    const emptyCells = [];
    for (let r = 0; r < 5; r++)
        for (let c = 0; c < 5; c++)
            if (board[r][c] === ' ') emptyCells.push([r, c]);

    if (emptyCells.length === 0) return null;

    // 전체 라인 완성 여부 확인 (GameState 건드리지 않는 내부 함수)
    function checkWin(symbol) {
        for (let i = 0; i < 5; i++) {
            if (board[i].every(cell => cell === symbol)) return true;
            if (board.every(row => row[i] === symbol)) return true;
        }
        if ([0,1,2,3,4].every(i => board[i][i] === symbol)) return true;
        if ([0,1,2,3,4].every(i => board[i][4-i] === symbol)) return true;
        return false;
    }

    // 1순위: 내가 이길 수 있으면 즉시 이기기
    for (const [r, c] of emptyCells) {
        board[r][c] = 'O';
        if (checkWin('O')) { board[r][c] = ' '; return r * 5 + c; }
        board[r][c] = ' ';
    }

    // 2순위: 플레이어 승리 차단
    for (const [r, c] of emptyCells) {
        board[r][c] = 'X';
        if (checkWin('X')) { board[r][c] = ' '; return r * 5 + c; }
        board[r][c] = ' ';
    }

    // 3순위: 각 빈 칸의 전략적 점수 계산
    // 해당 셀이 속한 라인(행/열/대각선)에서 내 심볼 개수가 많을수록 고점
    // 상대가 이미 해당 라인에 있으면 그 라인은 포기 (0점)
    function scoreCell(r, c, symbol) {
        const opp = symbol === 'O' ? 'X' : 'O';
        let score = 0;

        // 행 점수
        const rowOpp = board[r].filter(cell => cell === opp).length;
        if (rowOpp === 0) {
            const rowMy = board[r].filter(cell => cell === symbol).length;
            score += Math.pow(10, rowMy);
        }

        // 열 점수
        const colOpp = board.filter(row => row[c] === opp).length;
        if (colOpp === 0) {
            const colMy = board.filter(row => row[c] === symbol).length;
            score += Math.pow(10, colMy);
        }

        // 주 대각선 점수 (r === c 인 셀만 해당)
        if (r === c) {
            const diagOpp = [0,1,2,3,4].filter(i => board[i][i] === opp).length;
            if (diagOpp === 0) {
                const diagMy = [0,1,2,3,4].filter(i => board[i][i] === symbol).length;
                score += Math.pow(10, diagMy);
            }
        }

        // 반 대각선 점수 (r + c === 4 인 셀만 해당)
        if (r + c === 4) {
            const antiOpp = [0,1,2,3,4].filter(i => board[i][4-i] === opp).length;
            if (antiOpp === 0) {
                const antiMy = [0,1,2,3,4].filter(i => board[i][4-i] === symbol).length;
                score += Math.pow(10, antiMy);
            }
        }

        return score;
    }

    let bestScore = -1;
    let bestCell = emptyCells[0];

    for (const [r, c] of emptyCells) {
        // 공격 점수 1.1배 우선 (수비보다 공격 약간 우선)
        const total = scoreCell(r, c, 'O') * 1.1 + scoreCell(r, c, 'X');
        if (total > bestScore) {
            bestScore = total;
            bestCell = [r, c];
        }
    }

    const [r, c] = bestCell;
    board[r][c] = 'O';
    return r * 5 + c;
}
