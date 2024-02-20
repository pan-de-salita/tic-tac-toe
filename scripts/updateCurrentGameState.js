import { CELLS } from '../init.js';

export let currentGameState = JSON.parse(localStorage.getItem('currentGameState')) || createDefaultGameState();
export let currentGameRecord = JSON.parse(localStorage.getItem('currentGameRecord')) || [];

export function updateCurrentGameState() {
  updateGameRecord();
  clearCurrentGameState();
  createNewGameState();
}

export function createDefaultGameState() {
  return Array(3).fill().map(() => Array(3).fill());
}

function updateGameRecord() {
  currentGameRecord.push(currentGameState);
  localStorage.setItem('currentGameRecord', JSON.stringify(currentGameRecord));
  return currentGameRecord = JSON.parse(localStorage.getItem('currentGameRecord'));
}

function clearCurrentGameState() {
  localStorage.setItem('currentGameState', JSON.stringify(createDefaultGameState()));
  return currentGameState = JSON.parse(localStorage.getItem('currentGameState'));
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
