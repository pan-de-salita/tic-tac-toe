import { createDefaultGameState } from './updateCurrentGameState.js';

export let result = '';

export function isWin(gameState) {
  return checkForWin(gameState) // checks per row
    || checkForWin(reorientVertical(gameState)) // checks per column
    || checkForWin(makeDiagonal(gameState)); // checks per diagonal
}

export function isDraw(gameState) {
  if (gameState.every(subArray => subArray.every(value => (typeof value) === 'string'))) {
    result = 'DRAW';
    return true;
  }
  return false;
}

export function refreshResult() {
  result = '';
}

function checkForWin(gameState) {
  for (let i = 0; i < gameState.length; i++) {
    let allX = gameState[i].filter(value => value === 'x');
    let allO = gameState[i].filter(value => value === 'o');

    if (allX.length === 3) {
      result = 'X WINS';
      return true;
    } else if (allO.length === 3) {
      result = 'O WINS';
      return true;
    }
  }

  return false;
}

export function reorientVertical(gameState) {
  let reorientedGameState = createDefaultGameState();

  for (let i = 0; i < gameState.length; i++) {
    for (let j = 0; j < gameState.length; j++) {
      reorientedGameState[i][j] = gameState[j][i];
    }
  }

  return reorientedGameState;
}

export function makeDiagonal(gameState) {
  const rows = gameState.length;
  const cols = gameState[0].length;
  let leftDiagonal = [];
  let rightDiagonal = [];

  for (let i = 0; i < rows; i++) {
    leftDiagonal.push(gameState[i][i]);
    rightDiagonal.push(gameState[i][cols - i - 1]);
  }

  return [leftDiagonal, rightDiagonal];
}
