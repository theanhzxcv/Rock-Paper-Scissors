let score = JSON.parse(localStorage.getItem('score'));

console.log(score);

if (score === null) {
    score = {
        wins: 0,
        losses: 0,
        ties: 0
    };
}

function pickComputerMove() {
    const moves = ["Rock", "Paper", "Scissors"];
    const computerIndex = Math.floor(Math.random() * 3);
    const computerMove = moves[computerIndex];

    return computerMove;
}

function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = "";
    if (playerMove === computerMove) {
        result = "Tie.";
        score.ties++;
    } else {
        if ((playerMove === "Rock" && computerMove === "Scissors") ||
            (playerMove === "Paper" && computerMove === "Rock") ||
            (playerMove === "Scissors" && computerMove === "Paper")
        ) {
            result = "You win.";
            score.wins++;
        } else {
            result = "You lose.";
            score.losses++;
        }
    }

    localStorage.setItem('score', JSON.stringify(score));

    const displayResult = document.querySelector(".js-result");
    displayResult.textContent = `${result}`;

    const displayMove = document.querySelector(".js-moves");
    const lCPlayerMove = playerMove.toLowerCase();
    const lCComputerMove = computerMove.toLowerCase();
    displayMove.innerHTML = 
    `You: <img src="rock-paper-scissors/${lCPlayerMove}.png" class="move-icon">
    <img src="rock-paper-scissors/${lCComputerMove}.png" class="move-icon"> :Computer`;

    console.log(`${playerMove}`)
    const displayScore = document.querySelector(".js-score");
    displayScore.textContent = `Wins: ${score.wins}. ` + `Losses: ${score.losses}. ` + `Ties: ${score.ties}`;
}

let intervalId;

function resetScore() {
    score.losses = 0;
    score.ties = 0;
    score.wins = 0;

    localStorage.removeItem('score');

    const resultDisplay = document.querySelector(".js-score");
    resultDisplay.textContent = `Wins: ${score.wins}. ` + `Losses: ${score.losses}. ` + `Ties: ${score.ties}`;
}


function autoPlay() {
    const autoPlayButton = document.querySelector(".auto-play-btn");
    if (autoPlayButton.textContent === "Auto Play") {
        autoPlayButton.textContent = "Stop Auto Play";
        intervalId = setInterval(function() {
            const playerMoves = pickComputerMove();
            playGame(playerMoves);
        }, 700);
        // isAutoPlaying = true;
    } else {
        autoPlayButton.textContent = "Auto Play";
        // isAutoPlaying = false;
        clearInterval(intervalId);
    }

}