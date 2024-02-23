import { updateCurrentGameState, currentGameState } from './updateCurrentGameState.js';
import { result, isWin, isDraw } from './checkResult.js';
import { enableGameRecordNavigation } from './handleBackAndNextBtns.js';
import { changeTurnMessage } from './changeTurnMessage.js';
import { renderGameResultMessage } from './renderGameResult.js';
import { logCurrentMove } from './logCurrentMove.js';

export function handleCell(e) {
  makeMove(e.target);
  switchTurn();
  changeTurnMessage();
  updateCurrentGameState();
  logCurrentMove(e.target);

  if (isWin(currentGameState) || isDraw(currentGameState)) {
    disableCells();
    enableGameRecordNavigation();
    renderGameResultMessage(result);
  }
}

function makeMove(targetCell) {
  targetCell.classList.add('filled');
  targetCell.disabled = true;
}

function switchTurn() {
  document.querySelectorAll('.cell').forEach(cell => {
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
  document.querySelectorAll('.cell').forEach(cell => cell.disabled = true);
}
