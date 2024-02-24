import { renderGameState, createNewGame, GAME_DISPLAY } from './scripts/renderGameState.js';
import { handleCell } from './scripts/handleCell.js';
import { navigateGameStates } from './scripts/handleBackAndNextBtns.js';
import { handlePlayerSelect } from './scripts/handlePlayerSelect.js';
import { createDefaultGameState } from './scripts/updateCurrentGameState.js';

// initializes game
renderGameState(createDefaultGameState());

// restarts game via restart button
export const RESTART_BTN = document.querySelector('.restart');
RESTART_BTN.addEventListener('click', createNewGame);

// allows player to play against themselves or against the computer
const playerSelectBtn = document.querySelector('.player-select');
playerSelectBtn.addEventListener('click', handlePlayerSelect);

// allows player to revisit moves made after a game has finished
const BTN_CONTAINER = document.querySelector('.btn-container');
BTN_CONTAINER.addEventListener('click', navigateGameStates);
