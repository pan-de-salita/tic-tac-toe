import { renderGameState } from './scripts/renderGameState.js';
import { newGame } from './scripts/renderGameState.js';
import { handleCell } from './scripts/handleCell.js';
import { currentGameRecord } from './scripts/updateCurrentGameState.js';
import { currentGameState } from './scripts/updateCurrentGameState.js';

const RESTART_BTN = document.querySelector('.restart');

renderGameState();
export const CELLS = document.querySelectorAll('.cell');
CELLS.forEach(cell => cell.addEventListener('click', handleCell));

RESTART_BTN.addEventListener('click', function() {
  location.reload();
});

window.onload = newGame();
