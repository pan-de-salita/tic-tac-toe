import { renderGameState } from './scripts/renderGameState.js';
import { newGame } from './scripts/renderGameState.js';
import { handleCell } from './scripts/handleCell.js';
import { currentGameRecord } from './scripts/updateCurrentGameState.js';
import { currentGameState } from './scripts/updateCurrentGameState.js';

renderGameState();
export const CELLS = document.querySelectorAll('.cell');
CELLS.forEach(cell => cell.addEventListener('click', handleCell));

window.onload = function() {
  newGame();
  console.log(`currentGameRecord: ${currentGameRecord}`);
  console.log(`currentGameState: ${currentGameState}`);
};
