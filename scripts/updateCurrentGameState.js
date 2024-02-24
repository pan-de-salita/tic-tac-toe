export let currentGameState = createDefaultGameState();
export let currentGameRecord = [createDefaultGameState()];

export function createDefaultGameState() {
  return Array(3).fill().map(() => Array(3).fill());
}

export function updateCurrentGameState(targetCell) {
  createNewGameState(targetCell);
  updateCurrentGameRecord();
}

export function clearCurrentGameRecord() {
  currentGameRecord = [createDefaultGameState()];
}

export function clearCurrentGameState() {
  currentGameState = createDefaultGameState();
}

function updateCurrentGameRecord() {
  currentGameRecord.push(currentGameState);
}

function createNewGameState(cell) {
  const newSymbol = !(currentGameRecord.length % 2 === 0) ? 'x' : 'o';
  const targetRow = Number(cell.getAttribute('x'));
  const targetCol = Number(cell.getAttribute('y'));

  currentGameState = currentGameState.map((subArray, i) =>
    subArray.map((symbol, j) => {
      if (i === targetRow && j === targetCol) {
        return newSymbol;
      }

      return symbol;
    })
  );
}
