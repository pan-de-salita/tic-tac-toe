import { RESTART_BTN } from '../init.js';
import { BACK_BTN, NEXT_BTN } from './handleBackAndNextBtns.js';

const playerSelectBtn = document.querySelector('.player-select');

export function handlePlayerSelect(e) {
  if (e.target.textContent === 'Play against computer') {
    e.target.textContent = 'Play against self';
    e.target.classList.replace('computer', 'self');

    RESTART_BTN.style.borderColor = '#D45757';
    BACK_BTN.style.borderColor = '#035668';
    NEXT_BTN.style.borderColor = '#035668';
  } else {
    e.target.textContent = 'Play against computer';
    e.target.classList.replace('self', 'computer');

    RESTART_BTN.style.borderColor = '#035668';
    BACK_BTN.style.borderColor = '#D45757';
    NEXT_BTN.style.borderColor = '#D45757';
  }
}

export function lockPlayerSelect() {
  playerSelectBtn.removeEventListener('click', handlePlayerSelect);
  playerSelectBtn.classList.add('locked');
}

export function unlockPlayerSelect() {
  playerSelectBtn.addEventListener('click', handlePlayerSelect);
  playerSelectBtn.classList.remove('locked');
}
