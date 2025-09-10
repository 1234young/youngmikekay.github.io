const choices = ["rock", "paper", "scissors"];
const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultDisplay = document.getElementById("resultDisplay");
const playerScoreDisplay = document.getElementById("playerScore");
const computerScoreDisplay = document.getElementById("computerScore");

let playerScore = 0;
let computerScore = 0;

function playGame(playerChoice) {
  if (!choices.includes(playerChoice)) {
    resultDisplay.textContent = "Invalid choice!";
    return;
  }

  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  let result = "";

  if (playerChoice === computerChoice) {
    result = "IT'S A TIE!";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    result = "YOU WIN!";
    playerScore++;
  } else {
    result = "YOU LOSE!";
    computerScore++;
  }

  playerDisplay.textContent = `PLAYER: ${playerChoice}`;
  computerDisplay.textContent = `COMPUTER: ${computerChoice}`;
  resultDisplay.textContent = result;
  playerScoreDisplay.textContent = `Player Score: ${playerScore}`;
  computerScoreDisplay.textContent = `Computer Score: ${computerScore}`;
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  playerScoreDisplay.textContent = "Player Score: 0";
  computerScoreDisplay.textContent = "Computer Score: 0";
  resultDisplay.textContent = "Game reset. Play again!";
}