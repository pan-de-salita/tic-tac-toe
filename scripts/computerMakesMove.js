import { currentGameState, currentGameRecord, updateCurrentGameState } from './updateCurrentGameState.js';
import { disableCells, makeMove } from './handleCell.js';
import { logCurrentMove } from './logCurrentMove.js';
import { enableGameRecordNavigation } from './handleBackAndNextBtns.js';
import { renderGameResultMessage } from './renderGameResult.js';
import { isWin, isDraw, result } from './checkResult.js';

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

export function computerMakesMove() {
  placeIntoCell(chooseRandomAvailableCell(findAvailableCells()));
}

function findAvailableCells() {
  let availableCells = [];

  currentGameState.flat().forEach((cell, i) => {
    if (!cell) {
      return availableCells.push(i);
    }
  });

  return availableCells;
}

// TODO: deprecate
function chooseRandomAvailableCell(availableCells) {
  return availableCells[Math.floor(Math.random() * availableCells.length)];
}

function findBestAvailableCell(availableCells) {
  // TODO: assign score per cell
  return availableCells.reduce((bestAvailableCell, currentCell) => {

  });

  return win(availableCells) || block(availableCells)
    || fork(availableCells) || blockFork(availableCells)
    || playCenter(availableCells) || playOppositeCorner(availableCells)
    || playEmptyCorner(availableCells) || playEmptySide(availableCells);
}

// TODO: write a function for each:
// Win: If the player has two in a row, they can place a third to get
// three in a row.

// Block: If the opponent has two in a row, the player must play the
// third themselves to block the opponent.

// Fork: Cause a scenario where the player has two ways to win (two
// non-blocked lines of 2).

// Blocking an opponent's fork: If there is only one possible fork
// for the opponent, the player should block it. Otherwise, the player
// should block all forks in any way that simultaneously allows them
// to make two in a row. Otherwise, the player should make a two in a
// row to force the opponent into defending, as long as it does not
// result in them producing a fork. For example, if "X" has two opposite
// corners and "O" has the center, "O" must not play a corner move to
// win. (Playing a corner move in this scenario produces a fork for "X" to win.)

// Center: A player marks the center. (If it is the first move of the
// game, playing a corner move gives the second player more opportunities
// to make a mistake and may therefore be the better choice; however,
// it makes no difference between perfect players.)

// Opposite corner: If the opponent is in the corner, the player plays
// the opposite corner.

// Empty corner: The player plays in a corner square.

// Empty side: The player plays in a middle square on any of the four sides.

function placeIntoCell(availableCellIndex) {
  const cells = document.querySelectorAll('.cell');
  let targetCell = cells[availableCellIndex];

  makeMove(targetCell);
  updateCurrentGameState();
  logCurrentMove(targetCell);

  // TODO: rewrite as function
  if (isWin(currentGameState) || isDraw(currentGameState)) {
    disableCells();
    enableGameRecordNavigation();
    renderGameResultMessage(result);
  }
}
