import { createDefaultGameState, currentGameState } from './updateCurrentGameState.js';
import { CELLS } from '../init.js';

export const GAME_DISPLAY = document.querySelector('.game-container');

export function renderGameState(gameState = currentGameState) {
  gameState.forEach(row => row.forEach(cell => renderCell(cell)));
}

function renderCell(cell) {
  let cellElement = document.createElement('button');

  if (!cell) {
    cellElement.classList.add('cell', 'x-symbol'); // x-symbol as default
  } else {
    // handles rendering per page reload
    cellElement.classList.toggle('cell');
    cellElement.classList.toggle(`${cell === 'x' ? 'x-symbol' : 'o-symbol'}`);
    cellElement.classList.toggle('filled');
  }

  GAME_DISPLAY.append(cellElement);
}

export async function newGame() {
  localStorage.clear();

  await new Promise(resolve => setTimeout(resolve, 100));

  CELLS.forEach(cell => {
    cell.classList.remove('filled');
    cell.classList.replace('o-symbol', 'x-symbol');
  });
}
