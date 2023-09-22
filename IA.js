const IA = {
  pastPosition: [],
  blockedPosition: [],

  startIA: function () {
    if (!gameOver) {
      this.moveBear();
      move();
      setTimeout(function () {
        IA.startIA();
      }, 300);
    }
  },

  moveBear: function () {
    let possibilities = this.getPossibilities();
    if (possibilities.length === 1) {
      this.blockedPosition.push(playerPosition);
    }
    console.log(possibilities);
    playerPosition = this.getBestPossibility(possibilities);

    this.savePositionPlayed(playerPosition);
  },

  getPossibilities: function () {
    let possibilities = [];

    if (getCell(playerPosition[0], playerPosition[1]).left) {
      if (!this.isBlockedPosition([playerPosition[0], playerPosition[1] - 1])) {
        possibilities.push([playerPosition[0], playerPosition[1] - 1]);
      }
    }

    if (getCell(playerPosition[0], playerPosition[1]).right) {
      if (!this.isBlockedPosition([playerPosition[0], playerPosition[1] + 1])) {
        possibilities.push([playerPosition[0], playerPosition[1] + 1]);
      }
    }

    if (getCell(playerPosition[0], playerPosition[1]).top) {
      if (!this.isBlockedPosition([playerPosition[0] - 1, playerPosition[1]])) {
        possibilities.push([playerPosition[0] - 1, playerPosition[1]]);
      }
    }

    if (getCell(playerPosition[0], playerPosition[1]).bottom) {
      if (!this.isBlockedPosition([playerPosition[0] + 1, playerPosition[1]])) {
        possibilities.push([playerPosition[0] + 1, playerPosition[1]]);
      }
    }

    return possibilities;
  },

  getBestPossibility: function (possibilities) {
    let bestPosition = possibilities[0];
    let arrBestPosition = [possibilities[0]];
    let bestPositionWeight = this.getWeightPosition(possibilities[0]);

    for (let i = 1; i < possibilities.length; i++) {
      let weight = this.getWeightPosition(possibilities[i]);
      if (weight < bestPositionWeight) {
        bestPositionWeight = weight;
        bestPosition = possibilities[i];
        arrBestPosition = new Array();
        arrBestPosition.push(bestPosition);
      } else if (weight === bestPositionWeight) {
        arrBestPosition.push(possibilities[i]);
      }
    }

    let randomPossibility = Math.floor(Math.random() * arrBestPosition.length);
    let posToPlay = arrBestPosition[randomPossibility];
    return posToPlay;
  },

  savePositionPlayed: function (position) {
    let idPastPosition = this.getPastPosition(position);
    if (idPastPosition === -1) {
      position.push(1);
      this.pastPosition.push(position);
    } else {
      this.pastPosition[idPastPosition][2]++;
    }
  },

  getPastPosition: function (position) {
    for (let i = 0; i < this.pastPosition.length; i++) {
      if (
        this.pastPosition[i][0] === position[0] &&
        this.pastPosition[i][1] === position[1]
      ) {
        return i;
      }
    }
    return -1;
  },

  getWeightPosition: function (position) {
    for (let i = 0; i < this.pastPosition.length; i++) {
      if (
        this.pastPosition[i][0] === position[0] &&
        this.pastPosition[i][1] === position[1]
      ) {
        return this.pastPosition[i][2];
      }
    }
    return 0;
  },

  isBlockedPosition: function (position) {
    for (let i = 0; i < this.blockedPosition.length; i++) {
      if (
        this.blockedPosition[i][0] === position[0] &&
        this.blockedPosition[i][1] === position[1]
      ) {
        return true;
      }
    }
    return false;
  },
};
