const gameDisplay = document.querySelector('.game-display');

let currentGameState = [
  ['X', 'O', 'X'],
  ['X', 'O', ''],
  ['O', 'O', ''],
];

// displays current game state
const displayGameState = (gameState) => {
  gameState.map(row => row.map(cell => displayCell(cell)));
}

// displays a single cell
const displayCell = (cell) => {
  gameDisplay.append(createCell(cell));
}

// creates a single cell
const createCell = (cell) => {
  return Object.assign(
    document.createElement('div'), {
      className: 'cell',
      style: 'border:  1px solid blue',
      textContent: cell
    });
}

displayGameState(currentGameState);
