import { renderGameState, newGame } from './scripts/renderGameState.js';
import { handleCell } from './scripts/handleCell.js';
import { navigateGameStates } from './scripts/handleBackAndNextBtns.js';
import { playerSelect } from './scripts/playerSelect.js';

// initializes game
renderGameState();
export const CELLS = document.querySelectorAll('.cell');
CELLS.forEach(cell => cell.addEventListener('click', handleCell));

// restarts game via restart button
const RESTART_BTN = document.querySelector('.restart');
RESTART_BTN.addEventListener('click', () => {
  location.reload();
});

// restarts game via page reload
window.onload = newGame();

// allows player to play against themselves or with the computer
const playerSelectBtn = document.querySelector('.player-select');
playerSelectBtn.addEventListener('click', playerSelect);

// allows player to revisit moves made after a game has finished
const BTN_CONTAINER = document.querySelector('.btn-container');
BTN_CONTAINER.addEventListener('click', navigateGameStates);
