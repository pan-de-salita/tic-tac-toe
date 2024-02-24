import { updateCurrentGameState, currentGameState } from './updateCurrentGameState.js';
import { result, isWin, isDraw } from './checkResult.js';
import { enableGameRecordNavigation } from './handleBackAndNextBtns.js';
import { changeTurnMessage } from './changeTurnMessage.js';
import { renderGameResultMessage } from './renderGameResult.js';
import { logCurrentMove } from './logCurrentMove.js';
import { computerMakesMove } from './computerMakesMove.js';
import { lockPlayerSelect } from './handlePlayerSelect.js';

export function handleCell(e) {
  const playerMode = document.querySelector('.player-select').textContent;

  lockPlayerSelect();
  makeMove(e.target);
  switchTurn();
  changeTurnMessage();
  updateCurrentGameState(e.target);
  logCurrentMove(e.target);

  if (isWin(currentGameState) || isDraw(currentGameState)) {
    disableCells();
    enableGameRecordNavigation();
    renderGameResultMessage(result);
  } else {
    if (playerMode === 'Play against computer') {
      setTimeout(() => {
        computerMakesMove();
        switchTurn();
        changeTurnMessage();
      }, 666); // devil in the details
    }
  }
}

export function disableCells() {
  document.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', handleCell));
}

export function makeMove(targetCell) {
  targetCell.classList.add('filled');
  targetCell.removeEventListener('click', handleCell);
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
