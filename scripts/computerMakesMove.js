import { currentGameState, currentGameRecord, updateCurrentGameState, createDefaultGameState } from './updateCurrentGameState.js';
import { disableCells, makeMove } from './handleCell.js';
import { logCurrentMove } from './logCurrentMove.js';
import { enableGameRecordNavigation } from './handleBackAndNextBtns.js';
import { renderGameResultMessage } from './renderGameResult.js';
import { isWin, isDraw, result, reorientVertical, makeDiagonal } from './checkResult.js';
import { showCredit } from './showCredit.js';

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

export function computerMakesMove() {
  placeIntoCell(
    chooseRandomAvailableCell(findAvailableCells(),
                              findUnavailableCells())
  );
}

function findAvailableCells() {
  let availableCells = createDefaultGameState();

  currentGameState.forEach((subArray, i) =>
    subArray.forEach((_, j) => {
      if (!subArray[j]) {
        availableCells[i][j] = i * subArray.length + j;
      } else {
        availableCells[i][j] = undefined;
      }
    })
  );

  // console.log(availableCells);
  return availableCells;
}

function findUnavailableCells() {
  let unavailableCells = createDefaultGameState();

  currentGameState.forEach((subArray, i) =>
    subArray.forEach((_, j) => {
      if (subArray[j]) {
        unavailableCells[i][j] = i * subArray.length + j;
      } else {
        unavailableCells[i][j] = undefined;
      }
    })
  );

  // console.log(unavailableCells);
  return unavailableCells;
}

function findCellsOccupiedByX() {
  let cellsOccupiedByX = createDefaultGameState();

  currentGameState.forEach((subArray, i) =>
    subArray.forEach((_, j) => {
      if (subArray[j] === 'x') {
        cellsOccupiedByX[i][j] = i * subArray.length + j;
      } else {
        cellsOccupiedByX[i][j] = undefined;
      }
    })
  );

  // console.log(cellsOccupiedByX);
  return cellsOccupiedByX;
}

function findCellsOccupiedByO() {
  let cellsOccupiedByO = createDefaultGameState();

  currentGameState.forEach((subArray, i) =>
    subArray.forEach((_, j) => {
      if (subArray[j] === 'o') {
        cellsOccupiedByO[i][j] = i * subArray.length + j;
      } else {
        cellsOccupiedByO[i][j] = undefined;
      }
    })
  );

  // console.log(cellsOccupiedByO);
  return cellsOccupiedByO;
}

function chooseRandomAvailableCell(availableCells) {
  let candidate = getRandomAvailableCell(availableCells);

  if (candidate) {
    return candidate;
  } else {
    return chooseRandomAvailableCell(availableCells);
  }
}

function getRandomAvailableCell(availableCells) {
  return availableCells[Math.floor(Math.random() * availableCells.length)][Math.floor(Math.random() * availableCells.length)];
}

function findBestAvailableCell(availableCells) {

  return availableCells.reduce((bestAvailableCell, currentCell) => {
    let scoreForCurrentCell = 0;
    const unAvailableCells = findUnavailableCells();

    if (canWin(currentCell)) {
      scoreForCurrentCell = 10;
    }
  });

  // return win(availableCells) || block(availableCells)
  //   || fork(availableCells) || blockFork(availableCells)
  //   || playCenter(availableCells) || playOppositeCorner(availableCells)
  //   || playEmptyCorner(availableCells) || playEmptySide(availableCells);
}

// TODO: write a function for each:
// Win: If the player has two in a row, they can place a third to get
// three in a row.
function canWin(cell) {
  const cellsByO = findCellsOccupiedByO();
  const cellsByX = findCellsOccupiedByX();

  for (let i = 0; i < cellsByO.length; i++) {
    for (let j = 0; j < cellsByX.length; j++) {
      if (cellsByO[i][j] === undefined && cellsByX[i][j] === undefined) {
        cellsByO[i][j] = cell;
      }
    }
  }

  for (let i = 0; i < cellsByO.length; i++) {
    // console.log(cellsByO.length);
    // console.log(cellsByO[i]);
    let result = false;
    if (winPatterns.some(pattern =>
      pattern.length === 3
        && pattern[0] === cellsByO[i][0]
        && pattern[1] === cellsByO[i][1]
        && pattern[2] === cellsByO[i][2])) {
      result = true;
      console.log(`O winnable? ${result}`)
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
    // console.log(cellsByO.length);
    // console.log(cellsByO[i]);
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
function canBlock(cell) {
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
    // console.log(cellsByO.length);
    // console.log(cellsByX[i]);
    if (winPatterns.some(pattern =>
      pattern.length === 3
        && pattern[0] === cellsByX[i][0]
        && pattern[1] === cellsByX[i][1]
        && pattern[2] === cellsByX[i][2])) {
      // console.log(`X winnable? ${true}`);
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

// Opposite corner: If the opponent is in the corner, the player plays
// the opposite corner.

// Empty corner: The player plays in a corner square.

// Empty side: The player plays in a middle square on any of the four sides.

function placeIntoCell(availableCellIndex) {
  const cells = document.querySelectorAll('.cell');
  const flattenedAvailableCells = findAvailableCells().flat();
  // console.log(flattenedAvailableCells);

  findAvailableCells().flat().forEach(index => {
    if ((typeof index) === 'number') {
      if (canBlock(index)) {
        availableCellIndex = canBlock(index);
        console.log(`canBlock: ${availableCellIndex}`);
        return availableCellIndex;
      }
    }
  });

  findAvailableCells().flat().forEach(index => {
    if ((typeof index) === 'number') {
      if (canWin(index)) {
        availableCellIndex = canWin(index);
        console.log(`canWin: ${availableCellIndex}`);
        return availableCellIndex;
      }
    }
  });



  // for (let i = 0; i < flattenedAvailableCells.length; i++) {
  //   if ((typeof flattenedAvailableCells[i]) === 'number') {
  //     if (canWin(flattenedAvailableCells[i])) {
  //       availableCellIndex = flattenedAvailableCells[i];
  //       break;
  //     } else if (canBlock(flattenedAvailableCells[i])) {
  //       availableCellIndex = flattenedAvailableCells[i];
  //       break;
  //     }
  //   }
  // }

  let targetCell = cells[availableCellIndex];

  makeMove(targetCell);
  updateCurrentGameState(targetCell);
  logCurrentMove(targetCell);

  // TODO: rewrite as function
  if (isWin(currentGameState) || isDraw(currentGameState)) {
    disableCells();
    enableGameRecordNavigation();
    renderGameResultMessage(result);
    showCredit();
  }
}
