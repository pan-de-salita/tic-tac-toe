import { renderGameState, GAME_DISPLAY } from './renderGameState.js';
import { currentGameRecord } from './updateCurrentGameState.js';

const BTN_CONTAINER = document.querySelector('.btn-container');
const BACK_BTN = document.querySelector('.back');
const NEXT_BTN = document.querySelector('.next');
let gameRecordIndex;

export function enableGameRecordNavigation() {
  defineGameRecordIndex();
  enableBtn(BACK_BTN);
}

function enableBtn(btn) {
  btn.style.visibility = 'visible';
}

function defineGameRecordIndex() {
  gameRecordIndex = currentGameRecord.length;
}

function navigateGameStates(e) {
  if (e.target === BACK_BTN && gameRecordIndex > 0) {
    gameRecordIndex--;
    GAME_DISPLAY.innerHTML = '';
    renderGameState(currentGameRecord[gameRecordIndex]);
    enableBtn(NEXT_BTN);
    console.log(gameRecordIndex);
  } else if (e.target === NEXT_BTN && gameRecordIndex < currentGameRecord.length) {
    gameRecordIndex++;
    GAME_DISPLAY.innerHTML = '';
    renderGameState(currentGameRecord[gameRecordIndex]);
    console.log(gameRecordIndex);
  }
}

BTN_CONTAINER.addEventListener('click', navigateGameStates);
