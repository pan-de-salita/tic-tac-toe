import { createDefaultGameState, currentGameState } from './updateCurrentGameState.js';
import { CELLS } from '../init.js';

export const GAME_DISPLAY = document.querySelector('.game-container');

export function renderGameState(gameState = currentGameState) {
  gameState.forEach((row, i) => row.forEach((cell, j) => renderCell(cell, i, j)));
}

function renderCell(cell, rowIndex, cellIndex) {
  const cellElement = document.createElement('button');
  cellElement.classList.add('cell');

  if (!cell) {
    cellElement.classList.add('x-symbol', `x${rowIndex}`, `y${cellIndex}`);
  } else {
    // handles rendering during game state navigation
    cellElement.classList.toggle(`${cell === 'x' ? 'x-symbol' : 'o-symbol'}`);
    cellElement.classList.toggle('filled');
    cellElement.classList.toggle(`x${rowIndex}`);
    cellElement.classList.toggle(`y${cellIndex}`);
  }

  GAME_DISPLAY.append(cellElement);
}

export function newGame() {
  localStorage.clear();

  CELLS.forEach(cell => {
    cell.classList.remove('filled');
    cell.classList.replace('o-symbol', 'x-symbol');
  });
}
