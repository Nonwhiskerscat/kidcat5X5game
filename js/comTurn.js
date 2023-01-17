function comTurn(kitty) {
    let draw = catDraw(kitty);
    let comNyan;
    let isTaken;

    if (!draw) {
        do {
            comNyan = Math.floor(Math.random() * 25);
            isTaken = checkPos(kitty, comNyan + 1);
        } while (!isTaken);

        pushBoard(kitty, comNyan + 1, false);

        return comNyan;
    }
    return null;
}