const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => cellClick(index));
});

resetBtn.addEventListener("click", resetGame);

function cellClick(index) {
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  cells[index].innerText = currentPlayer;

  checkWinner();
}

function checkWinner() {
  let won = false;

  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      won = true;
      break;
    }
  }

  if (won) {
    statusText.innerText = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusText.innerText = "Game Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => cell.innerText = "");
  currentPlayer = "X";
  gameActive = true;
  statusText.innerText = "";
}
