import { currentGameState } from './updateCurrentGameState.js';

export function isDraw(gameState = currentGameState) {
  let result = gameState.every(subArray => subArray.every(value => (typeof value) === 'string'));
  localStorage.setItem('result', 'DRAW');
  return result;
}
