function pushBoard(kitty, move, catWin) {
    let symbol = catWin ? "X" : "O";
    switch (move) {
        case 1:
            kitty[0][0] = symbol;
            break;
        case 2:
            kitty[0][1] = symbol;
            break;
        case 3:
            kitty[0][2] = symbol;
            break;
        case 4:
            kitty[0][3] = symbol;
            break;
        case 5:
            kitty[0][4] = symbol;
            break;
        case 6:
            kitty[1][0] = symbol;
            break;
        case 7:
            kitty[1][1] = symbol;
            break;
        case 8:
            kitty[1][2] = symbol;
            break;
        case 9:
            kitty[1][3] = symbol;
            break;
        case 10:
            kitty[1][4] = symbol;
            break;
        case 11:
            kitty[2][0] = symbol;
            break;
        case 12:
            kitty[2][1] = symbol;
            break;
        case 13:
            kitty[2][2] = symbol;
            break;
        case 14:
            kitty[2][3] = symbol;
            break;
        case 15:
            kitty[2][4] = symbol;
            break;
        case 16:
            kitty[3][0] = symbol;
            break;
        case 17:
            kitty[3][1] = symbol;
            break;
        case 18:
            kitty[3][2] = symbol;
            break;      
        case 19:
            kitty[3][3] = symbol;
            break;
        case 20:
            kitty[3][4] = symbol;
            break;
        case 21:
            kitty[4][0] = symbol;
            break;
        case 22:
            kitty[4][1] = symbol;
            break;
        case 23:
            kitty[4][2] = symbol;
            break;
        case 24:
            kitty[4][3] = symbol;
            break;
        case 25:
            kitty[4][4] = symbol;
            break;
    }
}