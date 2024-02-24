import { createDefaultGameState, clearCurrentGameState, clearCurrentGameRecord } from './updateCurrentGameState.js';
import { handleCell } from './handleCell.js';
import { refreshTurnMessage } from './changeTurnMessage.js';
import { clearGameResultMessage } from './renderGameResult.js';
import { refreshResult } from './checkResult.js';
import { hideBtn, BACK_BTN, NEXT_BTN } from './handleBackAndNextBtns.js';
import { unlockPlayerSelect } from './handlePlayerSelect.js';

export const GAME_DISPLAY = document.querySelector('.game-container');

export function renderGameState(gameState) {
  gameState.forEach((row, i) => row.forEach((cell, j) => renderCell(cell, i, j)));
}

function renderCell(cell, rowIndex, cellIndex) {
  const cellElement = document.createElement('button');
  cellElement.classList.add('cell');

  if (!cell) {
    cellElement.classList.add('x-symbol');
    cellElement.setAttribute('x', rowIndex.toString());
    cellElement.setAttribute('y', cellIndex.toString());
    cellElement.addEventListener('click', handleCell);
  } else { // handles rendering for navigating between game states post-game
    cellElement.classList.toggle(`${cell === 'x' ? 'x-symbol' : 'o-symbol'}`);
    cellElement.classList.toggle('filled');
    cellElement.setAttribute('x', rowIndex.toString());
    cellElement.setAttribute('y', cellIndex.toString());
  }

  GAME_DISPLAY.append(cellElement);
}

export function createNewGame() {
  console.clear();

  GAME_DISPLAY.innerHTML = '';

  clearCurrentGameState();
  clearCurrentGameRecord();
  unlockPlayerSelect();
  clearGameResultMessage();
  refreshResult();
  refreshTurnMessage();
  hideBtn(BACK_BTN);
  hideBtn(NEXT_BTN);
  renderGameState(createDefaultGameState());
}
