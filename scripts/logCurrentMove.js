import { currentGameRecord } from './updateCurrentGameState.js';

const rowMapping = {
   0: 'top',
   1: 'mid',
   2: 'bottom',
};

const colMapping = {
   0: 'left',
   1: 'center',
   2: 'right',
};

export function logCurrentMove(targetCell) {
  const step = currentGameRecord.length - 1;
  const cell = targetCell.classList[1][0];
  const row = translateRow(Number(targetCell.classList[2][1]));
  const col = translateCol(Number(targetCell.classList[3][1]));

  console.log(`move ${step}: ${cell} placed at ${row}-${col}`);
}

function translateRow(x) {
  return rowMapping[x] || '';
}

function translateCol(y) {
  return colMapping[y] || '';
}
