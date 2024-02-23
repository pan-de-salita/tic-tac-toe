export let currentGameState = createDefaultGameState();
export let currentGameRecord = [createDefaultGameState()];

export function createDefaultGameState() {
  return Array(3).fill().map(() => Array(3).fill());
}

export function updateCurrentGameState() {
  clearCurrentGameState();
  createNewGameState(document.querySelectorAll('.cell'));
  updateCurrentGameRecord();
}

export function clearCurrentGameRecord() {
  currentGameRecord = [createDefaultGameState()];
}

export function clearCurrentGameState() {
  currentGameState = createDefaultGameState();
}

function createNewGameState(cells) {
  currentGameState = currentGameState.map((subArray, i) =>
    subArray.map((_, j) => {
      const cellIndex = i * currentGameState.length + j;

      if (cells[cellIndex].classList.contains('filled')) {
        return cells[cellIndex].classList.contains('x-symbol') ? 'x' : 'o';
      }

      return subArray[j];
    })
  );
}

function updateCurrentGameRecord() {
  currentGameRecord.push(currentGameState);
}
