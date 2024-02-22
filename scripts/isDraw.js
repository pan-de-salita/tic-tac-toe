import { currentGameState } from './updateCurrentGameState.js';

export function isDraw(gameState = currentGameState) {
  return gameState.every(subArray => subArray.every(value => (typeof value) === 'string'));
}
