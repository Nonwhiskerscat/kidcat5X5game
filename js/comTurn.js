function comTurn() {
    const board = GameState.board;
    const difficulty = GameState.difficulty;

    // 빈 칸 목록 수집
    const emptyCells = [];
    for (let r = 0; r < 5; r++)
        for (let c = 0; c < 5; c++)
            if (board[r][c] === ' ') emptyCells.push([r, c]);

    if (emptyCells.length === 0) return null;

    // 해당 심볼이 아직 이길 수 있는 라인이 하나라도 있는지 확인
    function canWin(symbol) {
        const opp = symbol === 'O' ? 'X' : 'O';
        for (let i = 0; i < 5; i++) {
            if (!board[i].some(cell => cell === opp)) return true;
            if (!board.some(row => row[i] === opp)) return true;
        }
        if (![0,1,2,3,4].some(i => board[i][i] === opp)) return true;
        if (![0,1,2,3,4].some(i => board[i][4-i] === opp)) return true;
        return false;
    }

    // 난이도 무관: 양쪽 모두 이길 수 없으면 무승부
    if (!canWin('O') && !canWin('X')) return null;

    // 쉬워: 즉시 이기기 + 4개 차단만 + 자기 라인 위주 단순 점수
    if (difficulty === 'easy') {
        function checkWinEasy(symbol) {
            for (let i = 0; i < 5; i++) {
                if (board[i].every(cell => cell === symbol)) return true;
                if (board.every(row => row[i] === symbol)) return true;
            }
            if ([0,1,2,3,4].every(i => board[i][i] === symbol)) return true;
            if ([0,1,2,3,4].every(i => board[i][4-i] === symbol)) return true;
            return false;
        }
        // 즉시 이기기
        for (const [r, c] of emptyCells) {
            board[r][c] = 'O';
            if (checkWinEasy('O')) { return r * 5 + c; }
            board[r][c] = ' ';
        }
        // 4개 연속만 차단
        function countInLine(line, symbol) {
            return line.filter(cell => cell === symbol).length;
        }
        for (const [r, c] of emptyCells) {
            const row = board[r];
            const col = board.map(row => row[c]);
            const diag = r === c ? [0,1,2,3,4].map(i => board[i][i]) : null;
            const anti = r + c === 4 ? [0,1,2,3,4].map(i => board[i][4-i]) : null;
            const lines = [row, col, diag, anti].filter(Boolean);
            const isBlockNeeded = lines.some(line =>
                countInLine(line, 'X') === 4 && countInLine(line, 'O') === 0
            );
            if (isBlockNeeded) {
                board[r][c] = 'O';
                return r * 5 + c;
            }
        }
        // 자기 라인 위주 단순 점수 (수비 고려 없음)
        let bestScore = -1;
        let bestCell = emptyCells[0];
        for (const [r, c] of emptyCells) {
            let score = 0;
            score += board[r].filter(cell => cell === 'O').length;
            score += board.map(row => row[c]).filter(cell => cell === 'O').length;
            if (r === c) score += [0,1,2,3,4].filter(i => board[i][i] === 'O').length;
            if (r + c === 4) score += [0,1,2,3,4].filter(i => board[i][4-i] === 'O').length;
            if (score > bestScore) { bestScore = score; bestCell = [r, c]; }
        }
        const [r, c] = bestCell;
        board[r][c] = 'O';
        return r * 5 + c;
    }

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

    // 무난해 + 미친냥이: 즉시 이기기 + 차단
    // 1순위: 내가 이길 수 있으면 즉시 이기기
    for (const [r, c] of emptyCells) {
        board[r][c] = 'O';
        if (checkWin('O')) { return r * 5 + c; }
        board[r][c] = ' ';
    }

    // 2순위: 플레이어 승리 차단
    for (const [r, c] of emptyCells) {
        board[r][c] = 'X';
        if (checkWin('X')) { board[r][c] = ' '; return r * 5 + c; }
        board[r][c] = ' ';
    }

    // 미친냥이: 전략적 점수 계산
    function scoreCell(r, c, symbol) {
        const opp = symbol === 'O' ? 'X' : 'O';
        let score = 0;

        const rowOpp = board[r].filter(cell => cell === opp).length;
        if (rowOpp === 0) {
            const rowMy = board[r].filter(cell => cell === symbol).length;
            score += Math.pow(10, rowMy);
        }

        const colOpp = board.filter(row => row[c] === opp).length;
        if (colOpp === 0) {
            const colMy = board.filter(row => row[c] === symbol).length;
            score += Math.pow(10, colMy);
        }

        if (r === c) {
            const diagOpp = [0,1,2,3,4].filter(i => board[i][i] === opp).length;
            if (diagOpp === 0) {
                const diagMy = [0,1,2,3,4].filter(i => board[i][i] === symbol).length;
                score += Math.pow(10, diagMy);
            }
        }

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
