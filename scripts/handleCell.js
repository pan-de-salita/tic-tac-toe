import { CELLS } from '../init.js';
import { currentGameState, updateCurrentGameState } from './updateCurrentGameState.js';
import { isWin } from './isWin.js';
import { isDraw } from './isDraw.js';
import { enableGameRecordNavigation } from './handleBackAndNextBtns.js';
import { changeTurnMessage } from './changeTurnMessage.js';
import { renderGameResult } from './renderGameResult.js';
import { logCurrentMove } from './logCurrentMove.js';

export function handleCell(e) {
  makeMove(e.target);
  logCurrentMove(e.target);
  switchTurn();
  changeTurnMessage();
  updateCurrentGameState();

  if (isWin() || isDraw()) {
    disableCells();
    enableGameRecordNavigation();
    renderGameResult();
  } else {
    localStorage.setItem('result', '');
  }
}

function makeMove(targetCell) {
  targetCell.classList.add('filled');
  targetCell.disabled = true;
}

function switchTurn(cells = CELLS) {
  cells.forEach(cell => {
    if (!cell.classList.contains('filled')) {
      if (cell.classList.contains('x-symbol')) {
        cell.classList.replace('x-symbol', 'o-symbol');
      } else {
        cell.classList.replace('o-symbol', 'x-symbol');
      }
    }
  });
}

function disableCells() {
  CELLS.forEach(cell => cell.disabled = true);
}
