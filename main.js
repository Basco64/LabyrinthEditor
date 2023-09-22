const myGame = document.querySelector("#game");
const alert = document.querySelector(".alert");

let line1 = [0, 0, 0];
let line2 = [0, 0, 0];
let line3 = [0, 0, 0];
let arrGame = [line1, line2, line3];

displayGrid();

function displayGrid() {
  myGame.innerHTML = "";
  let content = "";
  for (let i = 0; i < arrGame.length; i++) {
    content += "<tr>";
    for (let j = 0; j < arrGame[i].length; j++) {
      content += "<td>";
      content += `<img src="images/${arrGame[i][j]}.png" id="${i}-${j}" oncontextmenu='return false' />`;
      content += "</td>";
    }
    content += "</tr>";
  }

  myGame.innerHTML = content;
}

function switchImage(line, column, add) {
  if (add) {
    if (arrGame[line][column] === 15) arrGame[line][column] = 0;
    arrGame[line][column]++;
  } else {
    if (arrGame[line][column] === 0) arrGame[line][column] = 15;
    arrGame[line][column]--;
  }
  displayGrid();
}

function createLabyrinth() {
  const totalLine = parseInt(document.querySelector("#totalLine").value);
  const totalColumn = parseInt(document.querySelector("#totalColumn").value);
  let arr = [];
  for (let i = 0; i < totalLine; i++) {
    let line = [];
    for (let j = 0; j < totalColumn; j++) {
      line.push(0);
    }
    arr.push(line);
  }
  arrGame = arr;
  displayGrid();
}

myGame.addEventListener("click", function () {
  let id = event.target.id;
  let dashID = id.indexOf("-");
  let line = id.substring(0, dashID);
  let column = id.substring(dashID + 1, id.length);
  console.log(event.target);

  switchImage(line, column, true);
});

myGame.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  let id = e.target.id;
  let dashID = id.indexOf("-");
  let line = id.substring(0, dashID);
  let column = id.substring(dashID + 1, id.length);
  console.log(e.target);

  switchImage(line, column, false);
});

function save() {
  let content = getContent();
  let filename = "level.js";
  let blob = new Blob([content], {
    type: "text/plain;charset=utf-8",
  });

  saveAs(blob, filename);
}

function getContent() {
  let content = "level : {";
  content += "totalLine :" + tabJeu.length + ", ";
  content += "totalColumn :" + tabJeu[0].length + ", ";
  for (var i = 0; i < tabJeu.length; i++) {
    content += "line" + (i + 1) + ": {";
    for (var j = 0; j < tabJeu[i].length; j++) {
      content += "case" + (j + 1) + ": " + tabJeu[i][j] + ", ";
    }
    content += "},";
  }
  content += "}";
  return content;
}
