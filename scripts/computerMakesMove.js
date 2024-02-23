import { currentGameRecord } from './updateCurrentGameState.js';
import { makeMove } from './handleCell.js';
import { logCurrentMove } from './logCurrentMove.js';

export function findAvailableCells() {
  const cells = document.querySelectorAll('.cell');
  let availableCells = [];

  for (let i = 0; i < cells.length; i++) {
    if (!cells[i].classList.contains('filled')) {
      availableCells.push(i);
    }
  }

  return availableCells;
}

export function chooseRandomAvailableCell(availableCells) {
  const randomIndex = Math.floor(Math.random() * availableCells.length);
  return availableCells[randomIndex];
}

export function computerMakesMove(availableCellIndex) {
  const cells = document.querySelectorAll('.cell');
  let targetCell = cells[availableCellIndex];
  makeMove(targetCell);
  logCurrentMove(targetCell);
}
