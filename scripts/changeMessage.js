const xMove = document.querySelector('.x-move');
const oMove = document.querySelector('.o-move');

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
