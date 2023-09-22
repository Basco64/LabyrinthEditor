const myGame = document.querySelector("#game");
const alert = document.querySelector(".alert");

let sizeIMG = 50;

let totalLine = 4;
let totalColumn = 4;

let playerPosition = [0, 0];
let currentLevel = 0;
let arrGame = null;

nextLevel();

function createCell(image) {
  let cell = {
    img: image,
    left: getLeft(image),
    top: getTop(image),
    right: getRight(image),
    bottom: getBot(image),
  };
  return cell;
}

function getLeft(image) {
  if (
    image === 0 ||
    image === 1 ||
    image === 2 ||
    image === 3 ||
    image === 6 ||
    image === 7 ||
    image === 8 ||
    image === 12
  )
    return true;
  return false;
}

function getTop(image) {
  if (
    image === 0 ||
    image === 2 ||
    image === 3 ||
    image === 4 ||
    image === 5 ||
    image === 8 ||
    image === 9 ||
    image === 14
  )
    return true;
  return false;
}

function getRight(image) {
  if (
    image === 0 ||
    image === 1 ||
    image === 3 ||
    image === 4 ||
    image === 6 ||
    image === 9 ||
    image === 10 ||
    image === 13
  )
    return true;
  return false;
}

function getBot(image) {
  if (
    image === 0 ||
    image === 1 ||
    image === 2 ||
    image === 4 ||
    image === 5 ||
    image === 7 ||
    image === 10 ||
    image === 11
  )
    return true;
  return false;
}

function displayLabyrinth(arrGame) {
  myGame.innerHTML = "";
  let content = "<table>";
  for (let i = 0; i < arrGame.length; i++) {
    content += "<tr>";
    for (let j = 0; j < arrGame[i].length; j++) {
      content += "<td>";
      content += `<img src='images/${arrGame[i][j].img}.png' />`;
      if (i === totalLine - 1 && j === totalColumn - 1) {
        let pandaX = 25 + 100 * i;
        let pandaY = 25 + 100 * j;
        content += `<img src='images/panda.png' style='width:${sizeIMG}px;height:${sizeIMG}px;position:absolute;left:${pandaY}px;top:${pandaX}px'/>`;
      }
      if (i === playerPosition[0] && j === playerPosition[1]) {
        let bearX = 25 + 100 * playerPosition[0];
        let bearY = 25 + 100 * playerPosition[1];
        content += `<img src='images/bear.png' style='width:${sizeIMG}px;height:${sizeIMG}px;position:absolute;left:${bearY}px;top:${bearX}px'/>`;
      }
      content += "</td>";
    }
    content += "</tr>";
  }
  content += "</table>";
  myGame.innerHTML = content;
}

function getCell(i, j) {
  return arrGame[i][j];
}

addEventListener("keyup", function (event) {
  let playerX = playerPosition[0];
  let playerY = playerPosition[1];

  if ((event.keyCode === 37 || event.keyCode === 81) && playerY > 0) {
    //left
    if (getCell(playerPosition[0], playerPosition[1]).left) {
      playerY--;
    }
  }
  if ((event.keyCode === 38 || event.keyCode === 90) && playerX > 0) {
    // top
    if (getCell(playerPosition[0], playerPosition[1]).top) {
      playerX--;
    }
  }
  if (
    (event.keyCode === 39 || event.keyCode === 68) &&
    playerY < totalColumn - 1
  ) {
    // right
    if (getCell(playerPosition[0], playerPosition[1]).right) {
      playerY++;
    }
  }
  if (
    (event.keyCode === 40 || event.keyCode === 83) &&
    playerX < totalLine - 1
  ) {
    // bottom
    if (getCell(playerPosition[0], playerPosition[1]).bottom) {
      playerX++;
    }
  }
  playerPosition = [playerX, playerY];
  displayLabyrinth(arrGame);
  checkEndOfLevel();
});

function checkEndOfLevel() {
  if (
    playerPosition[0] === totalLine - 1 &&
    playerPosition[1] === totalColumn - 1
  ) {
    let content = "";
    if (currentLevel < levels.nbLevels) {
      content += `<p>Bien joué ! Passer au niveau : ${currentLevel + 1}  ?</p>`;
      content +=
        "<button class='btn btn-primary' onClick='nextLevel()'> Suivant </button>";
    } else {
      content += "🎉 GG Xipat 🎉 t'es le meilleur!! 🎉";
    }

    alert.innerHTML = content;
    alert.classList.remove("d-none");
  }
}

function nextLevel() {
  currentLevel++;
  alert.classList.add("d-none");

  totalLine = levels["level" + currentLevel].totalLine;
  totalColumn = levels["level" + currentLevel].totalColumn;
  playerPosition = [0, 0];
  arrGame = loadLevel();

  displayLabyrinth(arrGame);
}

function loadLevel() {
  let arrLevel = [];

  for (let i = 1; i <= levels["level" + currentLevel].totalLine; i++) {
    let line = [];
    for (let j = 1; j <= levels["level" + currentLevel].totalColumn; j++) {
      let val = levels["level" + currentLevel]["line" + i]["case" + j];
      line.push(createCell(val));
    }
    arrLevel.push(line);
  }
  return arrLevel;
}
