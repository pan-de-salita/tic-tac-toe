import { updateCurrentGameState, currentGameState } from './updateCurrentGameState.js';
import { result, isWin, isDraw } from './checkResult.js';
import { enableGameRecordNavigation } from './handleBackAndNextBtns.js';
import { changeTurnMessage } from './changeTurnMessage.js';
import { renderGameResultMessage } from './renderGameResult.js';
import { logCurrentMove } from './logCurrentMove.js';
import { computerMakesMove } from './computerMakesMove.js';

export function handleCell(e) {
  let playerMode = document.querySelector('.player-select').textContent;

  // TODO: add styling signalling that user has chosen a game mode
  // document.querySelector('.player-select').disabled = true;

  makeMove(e.target);
  switchTurn();
  changeTurnMessage();
  updateCurrentGameState(e.target);
  logCurrentMove(e.target);

  // TODO: rewrite as function
  if (isWin(currentGameState) || isDraw(currentGameState)) {
    disableCells();
    enableGameRecordNavigation();
    renderGameResultMessage(result);
  } else if (playerMode === 'Play against computer') {
    setTimeout(() => {
      computerMakesMove();
      switchTurn();
      changeTurnMessage();
    }, 700);
  }
}

export function disableCells() {
  document.querySelectorAll('.cell').forEach(cell => cell.disabled = true);
}

export function makeMove(targetCell) {
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
