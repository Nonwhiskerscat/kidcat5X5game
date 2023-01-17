function resetGame(cat) {
    for (let i = 0; i < cat.length; i++) {
        for (let j = 0; j < cat.length; j++) {
            cat[i][j] = ' ';
        }
    }
}