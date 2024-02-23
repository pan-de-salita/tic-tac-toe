import { xMove, oMove } from './changeTurnMessage.js';

const MESSAGE_DISPLAY = document.querySelector('.msg-container');

let resultElement = undefined;

export function renderGameResultMessage(result) {
  xMove.style.display = 'none';
  oMove.style.display = 'none';
  renderResult(result);
}

export function clearGameResultMessage() {
  resultElement.style.display = 'none';
  xMove.style.display = 'block';
  oMove.style.display = 'block';
}

function renderResult(result) {
  resultElement = document.createElement('h2');
  resultElement.classList.toggle('msg');
  resultElement.classList.toggle('result');
  resultElement.textContent = result;
  resultElement.style.animation = 'fadeIn 0.8s ease-out';
  resultElement.style.color = resultColor(result);
  resultElement.style.display = 'block';
  MESSAGE_DISPLAY.append(resultElement);
}

function resultColor(result) {
  let resultColor;

  if (result.includes('X')) {
    resultColor = '#D45757';
  } else if (result.includes('O')) {
    resultColor = '#035668';
  } else {
    resultColor = '#373434';
  }

  return resultColor;
}
