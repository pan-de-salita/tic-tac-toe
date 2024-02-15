export let currentGameState = Array(3).fill().map(() => Array(3).fill(''));

const gameDisplay = document.querySelector('.game-display');

// displays current game state
export const displayGameState = (gameState) => {
  gameState.map(row => row.map(cell => displayCell(cell)));
}

// // displays a single cell
// const displayCellFromRow = (cell) => {
//   gameDisplay.append(createCellElement(cell));
// }

// // creates a single cell
// const createCellElement = (cell) => {
//   const cellElement = Object.assign(
//     document.createElement('div'), {
//       className: 'cell',
//       style: 'border:  1px solid blue',
//       textContent: cell
//     });

//   // add an event listener to each cell
//   cellElement.addEventListener('mouseover', (e) => {
//     e.target.style.backgroundColor = 'black';
//   });
//   cellElement.addEventListener('mouseout', (e) => {
//     e.target.style.backgroundColor = '';
//   });

//   return cellElement;
// }

// displays a single cell
const displayCell = (cell) => {
  const gameCell = createCell(cell);
  gameCell.addEventListener('mouseover', changeBackgroundColor);
  gameCell.addEventListener('mouseout', resetBackgroundColor);
  gameDisplay.append(gameCell);
};

// changes the background color to black on mouseover
const changeBackgroundColor = (e) => {
  e.target.style.backgroundColor = 'black';
};

// resets the background color to its original state on mouseout
const resetBackgroundColor = (e) => {
  e.target.style.backgroundColor = '';
};

// creates a single cell
const createCell = (cell) => {
  const cellElement = document.createElement('div');
  cellElement.classList.add('cell');
  cellElement.style.border = '1px solid blue';
  cellElement.textContent = cell;
  return cellElement;
}
