import { findAvailableCells, findUnavailableCells, findCellsOccupiedByX, findCellsOccupiedByO } from './findCellsForComputer.js';
import { isWin, isDraw, result, reorientVertical, makeDiagonal } from './checkResult.js';

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Win: If the player has two in a row, they can place a third to get
// three in a row.
export function canWin(cell) {
  const cellsByO = findCellsOccupiedByO();
  const cellsByX = findCellsOccupiedByX();

  // get cells occupied By O
  for (let i = 0; i < cellsByO.length; i++) {
    for (let j = 0; j < cellsByX.length; j++) {
      if (cellsByO[i][j] === undefined && cellsByX[i][j] === undefined) {
        cellsByO[i][j] = cell;
      }
    }
  }

  for (let i = 0; i < cellsByO.length; i++) {
    let result = false;
    if (winPatterns.some(pattern =>
      pattern.length === 3
        && pattern[0] === cellsByO[i][0]
        && pattern[1] === cellsByO[i][1]
        && pattern[2] === cellsByO[i][2])) {
      return cell;
    }
  }

  const verticalCellsByO = reorientVertical(cellsByO);
  for (let i = 0; i < verticalCellsByO.length; i++) {
    if (winPatterns.some(pattern =>
      pattern.length === 3
        && pattern[0] === verticalCellsByO[i][0]
        && pattern[1] === verticalCellsByO[i][1]
        && pattern[2] === verticalCellsByO[i][2])) {
      return cell;
    }
  }

  const diagonalCellsByO = makeDiagonal(cellsByO);
  for (let i = 0; i < diagonalCellsByO.length; i++) {
    if (winPatterns.some(pattern =>
      pattern.length === 3
        && pattern[0] === diagonalCellsByO[i][0]
        && pattern[1] === diagonalCellsByO[i][1]
        && pattern[2] === diagonalCellsByO[i][2])) {
      return cell;
    }
  }
}

// Block: If the opponent has two in a row, the player must play the
// third themselves to block the opponent.
export function canBlock(cell) {
  const cellsByO = findCellsOccupiedByO();
  const cellsByX = findCellsOccupiedByX();

  for (let i = 0; i < cellsByO.length; i++) {
    for (let j = 0; j < cellsByX.length; j++) {
      if (cellsByO[i][j] === undefined && cellsByX[i][j] === undefined) {
        cellsByX[i][j] = cell;
      }
    }
  }

  for (let i = 0; i < cellsByX.length; i++) {
    if (winPatterns.some(pattern =>
      pattern.length === 3
        && pattern[0] === cellsByX[i][0]
        && pattern[1] === cellsByX[i][1]
        && pattern[2] === cellsByX[i][2])) {
      return cell;
    }
  }

  const verticalCellsByX = reorientVertical(cellsByX);
  for (let i = 0; i < verticalCellsByX.length; i++) {
    if (winPatterns.some(pattern =>
      pattern.length === 3
        && pattern[0] === verticalCellsByX[i][0]
        && pattern[1] === verticalCellsByX[i][1]
        && pattern[2] === verticalCellsByX[i][2])) {
      return cell;
    }
  }

  const diagonalCellsByX = makeDiagonal(cellsByX);
  for (let i = 0; i < diagonalCellsByX.length; i++) {
    if (winPatterns.some(pattern =>
      pattern.length === 3
        && pattern[0] === diagonalCellsByX[i][0]
        && pattern[1] === diagonalCellsByX[i][1]
        && pattern[2] === diagonalCellsByX[i][2])) {
      return cell;
    }
  }
}

// Fork: Cause a scenario where the player has two ways to win (two
// non-blocked lines of 2).

// Blocking an opponent's fork: If there is only one possible fork
// for the opponent, the player should block it. Otherwise, the player
// should block all forks in any way that simultaneously allows them
// to make two in a row. Otherwise, the player should make a two in a
// row to force the opponent into defending, as long as it does not
// result in them producing a fork. For example, if "X" has two opposite
// corners and "O" has the center, "O" must not play a corner move to
// win. (Playing a corner move in this scenario produces a fork for "X" to win.)

// Center: A player marks the center. (If it is the first move of the
// game, playing a corner move gives the second player more opportunities
// to make a mistake and may therefore be the better choice; however,
// it makes no difference between perfect players.)
export function canPlaceInCenter(cell) {
  const cellsByO = findCellsOccupiedByO();
  const cellsByX = findCellsOccupiedByX();
  const centerRow = 1;
  const centerCol = 4;

  if (cell === centerCol && !cellsByX[centerRow][centerCol]) {
    return cell;
  }
}

// Opposite corner: If the opponent is in the corner, the player plays
// the opposite corner.
export function canPlaceInOppositeCorner(cell) {
  const cellsByO = findCellsOccupiedByO();
  const cellsByX = findCellsOccupiedByX();

  if ((cell === 0 && cellsByX[2][8])
      || (cell === 8 && cellsByX[0][0])
      || (cell === 2 && cellsByX[2][6])
      || (cell === 6 && cellsByX[0][2])) {
    return cell;
  }
}

  // Empty corner: The player plays in a corner square.
export function canPlaceInCorner(cell) {
  const cellsByO = findCellsOccupiedByO();
  const cellsByX = findCellsOccupiedByX();

  if ((cell === 0 && !cellsByX[2][8])
      || (cell === 8 && !cellsByX[0][0])
      || (cell === 2 && !cellsByX[2][6])
      || (cell === 6 && !cellsByX[0][2])) {
    return cell;
  }
}

  // Empty side: The player plays in a middle square on any of the four sides.
