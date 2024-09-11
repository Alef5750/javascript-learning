let currentPlayer = 1;
let scores = [0, 0];
let totals = [0, 0];
let winningScore = 0;
let timer;
let timeLeft = 10;
let gameActive = false;

const players = document.querySelectorAll(".player");
const dices = document.querySelectorAll(".dice");
const rollButton = document.getElementById("roll-dice");
const newGameButton = document.getElementById("new-game");
const winningScoreInput = document.getElementById("winning-score");
const gameStatus = document.getElementById("game-status");

function initGame() {
  currentPlayer = 1;
  scores = [0, 0];
  winningScore = parseInt(winningScoreInput.value) || 0;
  updateScores();
  updateTurnIndicator();

  if (winningScore > 0) {
    gameActive = true;
    gameStatus.textContent = `First to reach ${winningScore} wins!`;
    startTimer();
  } else {
    gameActive = false;
    gameStatus.textContent = "Set a winning score to start the game";
    clearInterval(timer);
    document.getElementById("timer-1").textContent = "10";
    document.getElementById("timer-2").textContent = "10";
  }

  rollButton.disabled = !gameActive;
}

function rollDice() {
  if (!gameActive) return;

  const dice1 = Math.floor(Math.random() * 6) + 1;
  const dice2 = Math.floor(Math.random() * 6) + 1;

  dices[0].textContent = dice1;
  dices[1].textContent = dice2;

  dices.forEach((dice) => {
    dice.classList.add("wiggle");
    setTimeout(() => dice.classList.remove("wiggle"), 500);
  });

  scores[currentPlayer - 1] += dice1 + dice2;
  updateScores();
  checkWin();
}

function updateScores() {
  document.getElementById(`score-${currentPlayer}`).textContent =
    scores[currentPlayer - 1];
  document.getElementById(`total-${currentPlayer}`).textContent =
    totals[currentPlayer - 1];
}

function checkWin() {
  if (scores[currentPlayer - 1] >= winningScore) {
    gameStatus.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    totals[currentPlayer - 1]++;
    saveToLocalStorage();
    clearInterval(timer);
    rollButton.disabled = true;
  } else {
    switchPlayer();
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  updateTurnIndicator();
  resetTimer();
}

function updateTurnIndicator() {
  players.forEach((player, index) => {
    player.querySelector(".turn-indicator").style.display =
      index + 1 === currentPlayer ? "block" : "none";
  });
}

function startTimer() {
  timeLeft = 10;
  updateTimerDisplay();
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft === 0) {
      switchPlayer();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  startTimer();
}

function updateTimerDisplay() {
  document.getElementById(`timer-${currentPlayer}`).textContent = timeLeft;
}

function saveToLocalStorage() {
  localStorage.setItem("diceTotals", JSON.stringify(totals));
}

function loadFromLocalStorage() {
  const savedTotals = localStorage.getItem("diceTotals");
  if (savedTotals) {
    totals = JSON.parse(savedTotals);
    updateScores();
  }
}

rollButton.addEventListener("click", rollDice);
newGameButton.addEventListener("click", initGame);
winningScoreInput.addEventListener("change", initGame);

loadFromLocalStorage();
initGame();
