import { currentGameState, createDefaultGameState } from './updateCurrentGameState.js';

export function findAvailableCells() {
  let availableCells = createDefaultGameState();

  currentGameState.forEach((subArray, i) =>
    subArray.forEach((_, j) => {
      if (!subArray[j]) {
        availableCells[i][j] = i * subArray.length + j;
      } else {
        availableCells[i][j] = undefined;
      }
    })
  );

  return availableCells;
}

export function findUnavailableCells() {
  let unavailableCells = createDefaultGameState();

  currentGameState.forEach((subArray, i) =>
    subArray.forEach((_, j) => {
      if (subArray[j]) {
        unavailableCells[i][j] = i * subArray.length + j;
      } else {
        unavailableCells[i][j] = undefined;
      }
    })
  );

  return unavailableCells;
}

export function findCellsOccupiedByX() {
  let cellsOccupiedByX = createDefaultGameState();

  currentGameState.forEach((subArray, i) =>
    subArray.forEach((_, j) => {
      if (subArray[j] === 'x') {
        cellsOccupiedByX[i][j] = i * subArray.length + j;
      } else {
        cellsOccupiedByX[i][j] = undefined;
      }
    })
  );

  return cellsOccupiedByX;
}

export function findCellsOccupiedByO() {
  let cellsOccupiedByO = createDefaultGameState();

  currentGameState.forEach((subArray, i) =>
    subArray.forEach((_, j) => {
      if (subArray[j] === 'o') {
        cellsOccupiedByO[i][j] = i * subArray.length + j;
      } else {
        cellsOccupiedByO[i][j] = undefined;
      }
    })
  );

  return cellsOccupiedByO;
}
