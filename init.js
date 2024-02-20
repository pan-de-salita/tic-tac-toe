import { renderGameState } from './scripts/renderGameState.js';
import { handleCell } from './scripts/handleCell.js';

renderGameState();
export const CELLS = document.querySelectorAll('.cell');

document.addEventListener('DOMContentLoaded', () => {
  CELLS.forEach(cell => cell.addEventListener('click', handleCell));
})
