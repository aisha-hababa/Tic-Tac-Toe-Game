let title = document.querySelector(".title");
let resultNumX = document.querySelector(".resultNumX");
let resultNumO = document.querySelector(".resultNumO");
let resultNum = document.querySelector(".resultNum");

let pvpBtn = document.getElementById("pvpBtn");
let aiBtn = document.getElementById("aiBtn");

let turn = "x";
let mode = "";
let gameStarted = false;
let gameFinished = false;

pvpBtn.disabled = false;
aiBtn.disabled = false;

let xScore = 0;
let oScore = 0;
let drawScore = 0;

let squares = [];

function winner() {
  for (let i = 1; i < 10; i++) {
    squares[i] = document.getElementById("item" + i).innerHTML;
  }
  if (
    squares[1] == squares[2] &&
    squares[2] == squares[3] &&
    squares[1] != ""
  ) {
    end(1, 2, 3);
    return true;
  } else if (
    squares[4] == squares[5] &&
    squares[5] == squares[6] &&
    squares[5] != ""
  ) {
    end(4, 5, 6);
    return true;
  } else if (
    squares[7] == squares[8] &&
    squares[8] == squares[9] &&
    squares[7] != ""
  ) {
    end(7, 8, 9);
    return true;
  } else if (
    squares[1] == squares[4] &&
    squares[4] == squares[7] &&
    squares[1] != ""
  ) {
    end(1, 4, 7);
    return true;
  } else if (
    squares[2] == squares[5] &&
    squares[5] == squares[8] &&
    squares[5] != ""
  ) {
    end(2, 5, 8);
    return true;
  } else if (
    squares[3] == squares[6] &&
    squares[6] == squares[9] &&
    squares[6] != ""
  ) {
    end(3, 6, 9);
    return true;
  } else if (
    squares[1] == squares[5] &&
    squares[5] == squares[9] &&
    squares[5] != ""
  ) {
    end(1, 5, 9);
    return true;
  } else if (
    squares[3] == squares[5] &&
    squares[5] == squares[7] &&
    squares[5] != ""
  ) {
    end(3, 5, 7);
    return true;
  }
  return false;
}

function end(num1, num2, num3) {
  gameFinished = true;

  title.innerHTML = `${squares[num1]} winner`;

  if (squares[num1] == "X") {
    xScore++;
  }

  if (squares[num1] == "O") {
    oScore++;
  }

  resultNumX.innerHTML = xScore;
  resultNumO.innerHTML = oScore;

  document.getElementById("item" + num1).classList.add("win");
  document.getElementById("item" + num2).classList.add("win");
  document.getElementById("item" + num3).classList.add("win");

  for (let i = 1; i < 10; i++) {
    document.getElementById("item" + i).classList.add("squaress");
  }
}
function game(id) {
  if (!gameStarted || gameFinished) {
    return;
  }
  title.innerHTML = "Choose Mode ... X O Game";
  let element = document.getElementById(id);

  if (element.innerHTML != "") {
    return;
  }

  if (turn == "x") {
    element.innerHTML = "X";
    turn = "o";
    title.innerHTML = "O";
  } else if (turn == "o" && mode == "pvp") {
    element.innerHTML = "O";
    turn = "x";
    title.innerHTML = "X";
  } else {
    return;
  }

  if (winner()) return;

  draw();

  if (gameFinished) return;

  if (mode == "ai") {
    aiMove();
  }
}

function draw() {
  let full = true;

  for (let i = 1; i < 10; i++) {
    if (squares[i] == "") {
      full = false;
    }
  }

  if (full) {
    gameFinished = true;

    drawScore++;
    resultNum.innerHTML = drawScore;
    title.innerHTML = "Draw!";
  }
}

function aiMove() {
  if (gameFinished) {
    return;
  }

  let empty = [];

  for (let i = 1; i < 10; i++) {
    if (squares[i] == "") {
      empty.push(i);
    }
  }

  let winningLines = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  let move;

  for (let i = 0; i < winningLines.length; i++) {
    let [a, b, c] = winningLines[i];

    if (squares[a] == "O" && squares[b] == "O" && squares[c] == "") {
      move = c;
      break;
    }

    if (squares[a] == "O" && squares[c] == "O" && squares[b] == "") {
      move = b;
      break;
    }

    if (squares[b] == "O" && squares[c] == "O" && squares[a] == "") {
      move = a;
      break;
    }
  }

  if (move == undefined) {
    for (let i = 0; i < winningLines.length; i++) {
      let [a, b, c] = winningLines[i];

      if (squares[a] == "X" && squares[b] == "X" && squares[c] == "") {
        move = c;
        break;
      }

      if (squares[a] == "X" && squares[c] == "X" && squares[b] == "") {
        move = b;
        break;
      }

      if (squares[b] == "X" && squares[c] == "X" && squares[a] == "") {
        move = a;
        break;
      }
    }
  }

  if (move == undefined) {
    let randomIndex = Math.floor(Math.random() * empty.length);
    move = empty[randomIndex];
  }

  let element = document.getElementById("item" + move);
  element.innerHTML = "O";

  turn = "x";
  title.innerHTML = "X";
  if (winner()) return;
  else draw();
}

function restartGame() {
  squares = [];
  turn = "x";
  mode = "";
  gameStarted = false;
  gameFinished = false;

  title.innerHTML = "Choose Mode";

  pvpBtn.disabled = false;
  aiBtn.disabled = false;

  pvpBtn.classList.remove("selected");
  aiBtn.classList.remove("selected");

  for (let i = 1; i < 10; i++) {
    let element = document.getElementById("item" + i);

    element.innerHTML = "";

    element.classList.remove("squaress");
    element.classList.remove("win");
  }
}

function setMode(selectedMode) {
  if (gameStarted || gameFinished) {
    return;
  }

  mode = selectedMode;
  gameStarted = true;

  pvpBtn.disabled = true;
  aiBtn.disabled = true;

  pvpBtn.classList.remove("selected");
  aiBtn.classList.remove("selected");

  if (mode == "pvp") {
    pvpBtn.classList.add("selected");
  } else {
    aiBtn.classList.add("selected");
  }
}
