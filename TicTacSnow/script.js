const statusDisplay = document.querySelector('.game--status');

let gameActive = true;

let currentPlayer = "X";

let gameState = ["", "", "", "", "", "", "", "", ""];
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(clickedCell, clickedCellIndex) {

    // change gamestate array and UI
    gameState[clickedCellIndex] = currentPlayer;

    if(currentPlayer == "X"){
        clickedCell.style.backgroundImage = "url(\"./images/candyCane.png\")"
    } else{
        clickedCell.style.backgroundImage = "url(\"./images/wreath.png\")"
    }

}

function handlePlayerChange() {

    // change player and and message
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {

    let roundWon = false;

    // check to see if anyone has won
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    // win scenario
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    // draw scenario
    let roundDraw = !gameState.includes("");

    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();

}

function handleCellClick(clickedCellEvent) {

    // get the clicked cell
    const clickedCell = clickedCellEvent.target;

    const clickedCellIndex = parseInt(
      clickedCell.getAttribute('data-cell-index')
    );

    // leave function if its already filled in or the game is stopped
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
  
    // if cell is empty these functions run
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();

}

function handleRestartGame() {

    // resets all game settings
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    for(i = 0; i < gameState.length; i++){
        document.getElementsByClassName(`cell${i}`)[0].style.backgroundImage = "url(\"./images/snowflake.png\")"
    }
}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);