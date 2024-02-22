import { renderGameState, newGame } from './scripts/renderGameState.js';
import { handleCell } from './scripts/handleCell.js';

// initializes game:
renderGameState();
export const CELLS = document.querySelectorAll('.cell');
CELLS.forEach(cell => cell.addEventListener('click', handleCell));

// restarts game via restart button:
const RESTART_BTN = document.querySelector('.restart');
RESTART_BTN.addEventListener('click', () => {
  location.reload();
});

// restarts game via page reload:
window.onload = newGame();
