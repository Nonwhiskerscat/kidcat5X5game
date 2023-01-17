function catDraw(kitty) {
    let emptyCells = 0;
    for (let i = 0; i < kitty.length; i++) {
        for (let j = 0; j < kitty.length; j++) {
            if (kitty[i][j] === ' ') {
                emptyCells++;
            }
        }
    }
    if (emptyCells !== 0) {
        return false;
    }
    return true;
}