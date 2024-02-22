import { RESTART_BTN } from '../init.js';

export function playerSelect(e) {
  if (e.target.textContent === 'Play against self') {
    e.target.textContent = 'Play against computer';
    e.target.style.borderColor = '#035668';
    RESTART_BTN.style.borderColor = '#D45757';
  } else {
    e.target.textContent = 'Play against self';
    e.target.style.borderColor = '#D45757';
    RESTART_BTN.style.borderColor = '#035668';
  }
}
