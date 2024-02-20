import { currentGameState } from './updateCurrentGameState.js';

const GAME_DISPLAY = document.querySelector('.game-container');

export function displayGameState(gameState = currentGameState) {
  gameState.forEach(row => row.forEach(cell => displayCell(cell)));
}

function displayCell(cell) {
  let cellElement = document.createElement('button');

  if (!cell) {
    cellElement.classList.add('cell', 'x-symbol'); // x-symbol as default
  } else {
    cellElement.classList.toggle('cell');
    cellElement.classList.toggle(`${cell === 'x' ? 'x-symbol' : 'o-symbol'}`);
    cellElement.classList.toggle('filled');
  }

  GAME_DISPLAY.append(cellElement);
}

displayCurrenGameState();
export const CELLS = document.querySelectorAll('.cell');

function displayButtons() => {

}
