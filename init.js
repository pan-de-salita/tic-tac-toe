import { renderGameState, newGame } from './scripts/renderGameState.js';
import { handleCell } from './scripts/handleCell.js';

renderGameState();
export const CELLS = document.querySelectorAll('.cell');
CELLS.forEach(cell => cell.addEventListener('click', handleCell));

const RESTART_BTN = document.querySelector('.restart');
RESTART_BTN.addEventListener('click', function() {
  location.reload();
});

window.onload = newGame();
