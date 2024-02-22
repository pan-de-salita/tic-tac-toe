import { currentGameState, createDefaultGameState } from './updateCurrentGameState.js';

export function isWin(gameState = currentGameState) {
  return checkForWin(gameState) // checks per row
    || checkForWin(reorientVertical(gameState)) // checks per column
    || checkForWin(makeDiagonal(gameState)); // checks per diagonal
}

function checkForWin(gameState) {
  for (let i = 0; i < gameState.length; i++) {
    let allX = gameState[i].filter(value => value === 'x');
    let allO = gameState[i].filter(value => value === 'o');

    if (allX.length === 3) {
      console.log('x wins');
      return true; // TODO: display result in .msg-container
    } else if (allO.length === 3) {
      console.log('o wins');
      return true; // TODO: display result in .msg-container
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
