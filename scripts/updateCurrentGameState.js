import { CELLS } from '../init.js';
import { isWin } from './isWin.js';

export let currentGameState = createDefaultGameState();
export let currentGameRecord = [];

export function createDefaultGameState() {
  return Array(3).fill().map(() => Array(3).fill());
}

export function updateCurrentGameState() {
  updateCurrentGameRecord();
  clearCurrentGameState();
  createNewGameState();
}

function updateCurrentGameRecord() {
  currentGameRecord.push(currentGameState);
  localStorage.setItem('currentGameRecord', JSON.stringify(currentGameRecord));
  return currentGameRecord;
}

function clearCurrentGameState() {
  localStorage.setItem('currentGameState', JSON.stringify(createDefaultGameState()));
  return currentGameState;
}

function createNewGameState(cells = CELLS) {
  currentGameState = currentGameState.map((subArray, i) =>
    subArray.map((_, j) => {
      const cellIndex = i * currentGameState.length + j;

      if (cells[cellIndex].classList.contains('filled')) {
        return cells[cellIndex].classList.contains('x-symbol') ? 'x' : 'o';
      }

      return subArray[j];
    })
  );

  localStorage.setItem('currentGameState', JSON.stringify(currentGameState));
  return currentGameState;
}
