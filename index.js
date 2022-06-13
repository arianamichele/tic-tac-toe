const tiles = document.querySelectorAll(".tile");
const playerX = "X";
const playerO = "O";
let turn = playerX; {
    window.alert("Player X Start!")
}

const boardState = Array(tiles.length);
boardState.fill(null);

const completedGame = document.getElementById("completed-game");
const gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");
playAgain.addEventListener("click", startNewGame);


tiles.forEach((tile) => tile.addEventListener("click", tileClick));


function setHoverText() {
    tiles.forEach((tile) => {
        tile.classList.remove("x-hover");
        tile.classList.remove("o-hover");
    });

    const hoverClass = `${turn.toLowerCase()}-hover`;

    tiles.forEach((tile) => {
        if (tile.innerText == "") {
            tile.classList.add(hoverClass);
        }
    });
}

setHoverText();

function tileClick(event) {
    if(completedGame.classList.contains("visible")){
        return;
    }

    const tile = event.target;
    const tileNumber = tile.dataset.index;
    if (tile.innerText != "") {
        return;
    }

    if (turn === playerX) {
        tile.innerText = playerX;
        boardState[tileNumber - 1] = playerX;
        turn = playerO
        window.confirm("Player O's Turn")
    
    } else {
        tile.innerText = playerO;
        boardState[tileNumber - 1] = playerO;
        turn = playerX
        window.confirm("Player X's Turn")
    }

    checkWinner();
}

    function checkWinner() {
        for (const winningCombination of winningCombinations) {
            const { combo, gameWin } = winningCombination;
            const tileValue1 = boardState[combo[0] - 1];
            const tileValue2 = boardState[combo[1] - 1];
            const tileValue3 = boardState[combo[2] - 1];

            if (
                tileValue1 != null &&
                tileValue1 === tileValue2 &&
                tileValue1 === tileValue3
            ) {
                gameWin.classList.add(gameWin);
                gameOverScreen(tileValue1);
                return;
            }
        }
        
        const allTileFilledIn = boardState.every((tile) => tile !== null);
        if (allTileFilledIn) {
            gameOverScreen (null);
        }
    }

    function gameOverScreen(winnerText) {
        let text = "Draw!";
        if (winnerText != null) {
            text = `Winner is ${winnerText}!`;
        }

        completedGame.className = "visible";
        gameOverText.innerText = text;
    }

    function startNewGame() {
        gameWin.className = "gameWin";
        completedGame.className = "hidden";
        boardState.fill(null);
        tiles.forEach((tile) => (tile.innerText = ""));
        turn = playerX;
        setHoverText();
    }

    const winningCombinations = [
        { combo: [1, 2, 3], gameWinClass: "gameWin-row-1" },
        { combo: [4, 5, 6], gameWinClass: "gameWin-row-2" },
        { combo: [7, 8, 9], gameWinClass: "gameWin-row-3" },
        { combo: [1, 4, 7], gameWinClass: "gameWin-column-1" },
        { combo: [2, 5, 8], gameWinClass: "gameWin-column-2" },
        { combo: [3, 6, 9], gameWinClass: "gameWin-column-3" },
        { combo: [1, 5, 9], gameWinClass: "gameWin-diagonal-1" },
        { combo: [3, 5, 7], gameWinClass: "gameWin-diagonal-2" },
    ];