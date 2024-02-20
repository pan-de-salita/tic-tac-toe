import { currentGameState } from './updateCurrentGameState.js';
import { createDefaultGameState } from './updateCurrentGameState.js';

export function isWin(gameState = currentGameState) {
  return checkForWin(gameState)
    || checkForWin(reorientVertical(gameState))
    || checkForWin(makeDiagonal(gameState));
}

function checkForWin(gameState) {
  for (let i = 0; i < gameState.length; i++) {
    let allX = gameState[i].filter(value => value === 'x');
    let allO = gameState[i].filter(value => value === 'o');

    if (allX.length === 3) {
      console.log('x wins');
      return true;
    } else if (allO.length === 3) {
      console.log('o wins');
      return true;
    }
  }

  return false;
}

function reorientVertical(gameState) {
  let reorientedGameState = createDefaultGameState();

  for (let i = 0; i < gameState.length; i++) {
    for (let j = 0; j < gameState.length; j++) {
      reorientedGameState[i].push(gameState[j][i]);
    }
  }

  return reorientedGameState;
}

function makeDiagonal(gameState) {
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
