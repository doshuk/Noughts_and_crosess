let emptySpace = 0;
const player1 = 1;
const player2 = 2;
let isPlayer1Go = false;
let isPlayer2Go = true;
let gameMap = [[], [], []];
let steps = [];
let nobodyWon = true;

Array.prototype.shuffle = function (b) {
    let i = this.length, j, t;

    while (i) {
        j = Math.floor((i--) * Math.random());
        t = b && typeof this[i].shuffle !== 'undefined' ? this[i].shuffle() : this[i];
        this[i] = this[j];
        this[j] = t;
    }
    return this;
};

for (let i = 0; i < gameMap.length; i++) {
    for (let j = 0; j < 3; j++) {
        gameMap[i][j] = emptySpace;
    }
}

for (let i = 0; i < 9; i++) {
    steps[i] = i;
}

steps = steps.shuffle();

for (let i = 0; i < steps.length; i++) {
    if (steps[i] < 3 && isPlayer2Go === true) {
        gameMap[0][steps[i]] = player1;
        isPlayer1Go = true;
        isPlayer2Go = false;
    } else if (steps[i] < 3 && isPlayer1Go === true) {
        gameMap[0][steps[i]] = player2;
        isPlayer1Go = false;
        isPlayer2Go = true;
    }

    if (steps[i] < 6 && steps[i] >= 3 && isPlayer2Go === true) {
        gameMap[1][steps[i] - 3] = player1;
        isPlayer1Go = true;
        isPlayer2Go = false;
    } else if (steps[i] < 6 && steps[i] >= 3 && isPlayer1Go === true) {
        gameMap[1][steps[i] - 3] = player2;
        isPlayer1Go = false;
        isPlayer2Go = true;
    }

    if (steps[i] < 9 && steps[i] >= 6 && isPlayer2Go === true) {
        gameMap[2][steps[i] - 6] = player1;
        isPlayer1Go = true;
        isPlayer2Go = false;
    } else if (steps[i] < 9 && steps[i] >= 6 && isPlayer1Go === true) {
        gameMap[2][steps[i] - 6] = player2;
        isPlayer1Go = false;
        isPlayer2Go = true;
    }

    if (isWinner(gameMap) === player1) {
        console.log("Player 1 is winner!");
        console.log(gameMap);
        nobodyWon = false;
        break;
    } else if (isWinner(gameMap) === player2) {
        console.log("Player 2 is winner!");
        console.log(gameMap);
        nobodyWon = false;
        break;
    }
}

if (nobodyWon) {
    console.log("Nobody won!");
    console.log(gameMap);
}

function isWinner(mas) {
    for (let i = 0; i < mas.length; i++) {
        let line = mas[i];
        let isPlayer1Row = true;
        let isPlayer1Column = true;
        let isPlayer1FirstDiagonal = true;
        let isPlayer1SecondDiagonal = true;
        let isPlayer2Row = true;
        let isPlayer2Column = true;
        let isPlayer2FirstDiagonal = true;
        let isPlayer2SecondDiagonal = true;

        for (let k = 0; k < line.length; k++) {
            if (line[k] !== player1) {
                isPlayer1Row = false;
            }

            if (mas[k][i] !== player1) {
                isPlayer1Column = false;
            }

            if (mas[k][k] !== player1) {
                isPlayer1FirstDiagonal = false;
            }

            if (mas[k][line.length - k] !== player1) {
                isPlayer1SecondDiagonal = false;
            }

            if (line[k] !== player2) {
                isPlayer2Row = false;
            }

            if (mas[k][i] !== player2) {
                isPlayer2Column = false;
            }

            if (mas[k][k] !== player2) {
                isPlayer2FirstDiagonal = false;
            }

            if (mas[k][line.length - k] !== player2) {
                isPlayer2SecondDiagonal = false;
            }
        }

        if (isPlayer1Row === true || isPlayer1Column === true || isPlayer1FirstDiagonal || isPlayer1SecondDiagonal) {
            return player1;
        } else if (isPlayer2Row === true || isPlayer2Column === true || isPlayer2FirstDiagonal || isPlayer2SecondDiagonal) {
            return player2;
        }
    }
}
