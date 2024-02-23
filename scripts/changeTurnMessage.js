export const xMove = document.querySelector('.x-move');
export const oMove = document.querySelector('.o-move');

export function refreshTurnMessage() {
  xMove.style.left = '50%';
  oMove.style.left = '200%';
}

document.addEventListener('DOMContentLoaded', () => {
  xMove.style.left = '50%';
  oMove.style.left = '200%';
});

export function changeTurnMessage() {
  if (xMove.style.left === '50%') {
    xMove.style.left = '-50%';
    oMove.style.left = '50%';
  } else {
    xMove.style.left = '50%';
    oMove.style.left = '200%';
  }
}
