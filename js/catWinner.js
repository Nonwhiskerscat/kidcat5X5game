function catWinner(kitty1, kitty2, catWin) {
    let symbol = catWin ? "X" : "O";
    let diagonalCountOne = 0;
    let diagonalCountSec = 0;

    for (let i = 0; i < kitty1.length; i++) {
        let horizontalCount = 0;
        let verticalCount = 0;

        for (let j = 0; j < kitty1.length; j++) {
            if (kitty1[i][j] === symbol) {
                horizontalCount++;
                kitty2.add(i, j);
            }
        }
        if (horizontalCount === 5) {
            return true;
        }
        kitty2.clearAll();

        for (let j = 0; j < kitty1.length; j++) {
            if (kitty1[j][i] === symbol) {
                verticalCount++;
                kitty2.add(j, i);
            }
        }
        if (verticalCount === 5) {
            return true;
        }
        kitty2.clearAll();
    }

    for (let i = 0; i < kitty1.length; i++) {
        if (kitty1[i][i] === symbol) {
            diagonalCountOne++;
            kitty2.add(i, i);
        }
    }

    if (diagonalCountOne === 5) {
        return true;
    }
    kitty2.clearAll();

    for (let i = 4, j = 0; i > -1; i--, j++) {
        if (kitty1[i][j] === symbol) {
            diagonalCountSec++;
            kitty2.add(i, j);
        }
    }
    if (diagonalCountSec === 5) {
        return true;
    }

    kitty2.clearAll();

    return false;
}