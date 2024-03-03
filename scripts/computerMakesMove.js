import { currentGameState, currentGameRecord, updateCurrentGameState, createDefaultGameState } from './updateCurrentGameState.js';
import { disableCells, makeMove } from './handleCell.js';
import { logCurrentMove } from './logCurrentMove.js';
import { enableGameRecordNavigation } from './handleBackAndNextBtns.js';
import { renderGameResultMessage } from './renderGameResult.js';
import { showCredit } from './showCredit.js';
import { findAvailableCells, findUnavailableCells, findCellsOccupiedByX, findCellsOccupiedByO } from './findCellsForComputer.js';
import { isWin, isDraw, result, reorientVertical, makeDiagonal } from './checkResult.js';
import { canPlaceInCenter, canPlaceInOppositeCorner, canBlockFork, canPlaceInCorner, canWin, canBlock } from './computerPlayer.js';

export function computerMakesMove() {
  placeIntoCell(findAvailableCells());
}

function chooseRandomAvailableCell(availableCells) {
  const candidate = getRandomAvailableCell(availableCells);
  return candidate ? candidate : chooseRandomAvailableCell(availableCells);
}

function getRandomAvailableCell(availableCells) {
  const row = Math.floor(Math.random() * availableCells.length);
  const col = Math.floor(Math.random() * availableCells.length);
  return availableCells[row][col];
}

function placeIntoCell(availableCells) {
  const cells = document.querySelectorAll('.cell');
  const flattenedAvailableCells = availableCells.flat();
  let targetCellIndex = chooseRandomAvailableCell(availableCells);

  flattenedAvailableCells.forEach(index => {
    if ((typeof index) === 'number') {
      let placeInCornerCandidate = canPlaceInCorner(index);
      if (placeInCornerCandidate >= 0) {
        console.log(`can place in corner ${placeInCornerCandidate}`);
        return targetCellIndex = placeInCornerCandidate;
      }
    }
  });

  flattenedAvailableCells.forEach(index => {
    if ((typeof index) === 'number') {
      let placeInOppositeCornerCandidate = canPlaceInOppositeCorner(index);
      if (placeInOppositeCornerCandidate >= 0) {
        console.log(`can place in opposite corner ${placeInOppositeCornerCandidate}`);
        return targetCellIndex = placeInOppositeCornerCandidate;
      }
    }
  });

  flattenedAvailableCells.forEach(index => {
    if ((typeof index) === 'number') {
      let blockForkCandidate = canBlockFork(index);
      if (blockForkCandidate >= 0) {
        console.log(`can block fork ${blockForkCandidate}`);
        return targetCellIndex = blockForkCandidate;
      }
    }
  });

  flattenedAvailableCells.forEach(index => {
    if ((typeof index) === 'number') {
      let placeInCenterCandidate = canPlaceInCenter(index);
      if (placeInCenterCandidate === 4) {
        console.log(`can place in center ${placeInCenterCandidate}`);
        return targetCellIndex = placeInCenterCandidate;
      }
    }
  });

  flattenedAvailableCells.forEach(index => {
    if ((typeof index) === 'number') {
      let blockCandidate = canBlock(index);
      if (blockCandidate >= 0) {
        console.log(`can block at ${blockCandidate}`);
        return targetCellIndex = blockCandidate;
      }
    }
  });

  flattenedAvailableCells.forEach(index => {
    if ((typeof index) === 'number') {
      let winCandidate = canWin(index);
      if (winCandidate >= 0) {
        console.log(`can win at ${winCandidate}`);
        return targetCellIndex = winCandidate;
      }
    }
  });

  const targetCell = cells[targetCellIndex];

  makeMove(targetCell);
  updateCurrentGameState(targetCell);
  logCurrentMove(targetCell);

  // TODO: rewrite as function
  if (isWin(currentGameState) || isDraw(currentGameState)) {
    disableCells();
    enableGameRecordNavigation();
    renderGameResultMessage(result);
    showCredit();
  }
}
