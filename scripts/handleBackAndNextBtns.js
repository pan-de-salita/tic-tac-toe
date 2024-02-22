import { renderGameState, GAME_DISPLAY } from './renderGameState.js';
import { currentGameRecord } from './updateCurrentGameState.js';

const BTN_CONTAINER = document.querySelector('.btn-container');
const BACK_BTN = document.querySelector('.back');
const NEXT_BTN = document.querySelector('.next');
let gameRecordIndex;

export function enableGameRecordNavigation() {
  defineGameRecordIndex();
  showBtn(BACK_BTN);
}

function navigateGameStates(e) {
  if (e.target === BACK_BTN && gameRecordIndex > 0) {
    gameRecordIndex--;
    showBtn(NEXT_BTN);
    if (gameRecordIndex <= 0) hideBtn(BACK_BTN);
  } else if (e.target === NEXT_BTN && gameRecordIndex < currentGameRecord.length) {
    gameRecordIndex++;
    showBtn(BACK_BTN);
    if (gameRecordIndex >= currentGameRecord.length) hideBtn(NEXT_BTN);
  }

  revisitGameState(currentGameRecord[gameRecordIndex])
}

BTN_CONTAINER.addEventListener('click', navigateGameStates);

function showBtn(btn) {
  btn.style.visibility = 'visible';
}

function hideBtn(btn) {
  btn.style.visibility = 'hidden';
}

function defineGameRecordIndex() {
  gameRecordIndex = currentGameRecord.length;
}

function revisitGameState(gameState) {
  GAME_DISPLAY.innerHTML = '';
  renderGameState(gameState);
}
