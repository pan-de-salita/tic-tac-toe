import { currentGameRecord } from './updateCurrentGameState.js';

const rowMapping = ['top', 'mid', 'bottom'];
const colMapping = ['left', 'center', 'right'];

export function logCurrentMove(targetCell) {
  const step = currentGameRecord.length - 1;
  const cell = targetCell.classList[1][0];
  const row = translateRow(Number(targetCell.classList[2][1]));
  const col = translateCol(Number(targetCell.classList[3][1]));

  console.log(`${step}: ${cell} at ${row}-${col}`);
}

function translateRow(x) {
  return rowMapping[x] || '';
}

function translateCol(y) {
  return colMapping[y] || '';
}
