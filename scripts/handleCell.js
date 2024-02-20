import { CELLS } from '../init.js';
import { updateCurrentGameState } from './updateCurrentGameState.js';
import { isWin } from './isWin.js';

export function handleCell(e) {
  let targetCell = e.target;

  makeMove(targetCell);
  switchTurn();
  updateCurrentGameState();

  if (isWin()) {
    CELLS.forEach(cell => cell.disabled = true);
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
  })
}
