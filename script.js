const gameDisplay = document.querySelector('.game-display');

let currentGameState = [
  ['0', '1', '2'],
  ['3', '4', '5'],
  ['6', '7', '8'],
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
