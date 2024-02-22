import { createDefaultGameState, currentGameState } from './updateCurrentGameState.js';
import { CELLS } from '../init.js';

export const GAME_DISPLAY = document.querySelector('.game-container');
const MESSAGE_DISPLAY = document.querySelector('.msg-container');

export function renderGameState(gameState = currentGameState) {
  gameState.forEach(row => row.forEach(cell => renderCell(cell)));
}

function renderCell(cell) {
  const cellElement = document.createElement('button');

  if (!cell) {
    cellElement.classList.add('cell', 'x-symbol'); // x-symbol as default
  } else {
    // handles rendering per page reload
    cellElement.classList.toggle('cell');
    cellElement.classList.toggle(`${cell === 'x' ? 'x-symbol' : 'o-symbol'}`);
    cellElement.classList.toggle('filled');
  }

  GAME_DISPLAY.append(cellElement);
}

export function renderGameResult() {
  MESSAGE_DISPLAY.innerHTML = '';
  renderResult();
}

function renderResult(resultFromStorage = localStorage.getItem('result')) {
  const result = document.createElement('h2');
  result.classList.toggle('msg');
  result.classList.toggle('result');
  result.textContent = resultFromStorage;
  result.style.animation = 'fadeIn 0.8s ease-out';
  result.style.color = resultColor();
  MESSAGE_DISPLAY.append(result);
}

function resultColor(resultFromStorage = localStorage.getItem('result')) {
  let resultColor;

  if (resultFromStorage.includes('X')) {
    resultColor = '#D45757';
  } else if (resultFromStorage.includes('O')) {
    resultColor = '#035668';
  } else {
    resultColor = '#373434';
  }

  return resultColor;
}

export function newGame() {
  localStorage.clear();

  CELLS.forEach(cell => {
    cell.classList.remove('filled');
    cell.classList.replace('o-symbol', 'x-symbol');
  });
}
