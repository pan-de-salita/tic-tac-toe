function reorientVertical(gameState) {
  let reorientedGameState = [[],[],[]];

  for (let i = 0; i < gameState.length; i++) {
    for (let j = 0; j < gameState.length; j++) {
      reorientedGameState[i].push(gameState[j][i]);
    }
  }

  return reorientedGameState;
}

// function makeDiagonal(gameState) {
//   let diagonalGameState = Array(2).fill().map(() => []);
//   let flatGameState = gameState.flat();

//   for (let i = 0; i < diagonalGameState.length; i++) {
//     if (!i) {
//       for (let j = 0; j < flatGameState.length; j += gameState.length + 1) {
//         diagonalGameState[i].push(flatGameState[j]);
//       }
//     } else {
//       for (let k = gameState.length - 1; k < flatGameState.length - 1; k += gameState.length - 1) {
//         diagonalGameState[i].push(flatGameState[k]);
//       }
//     }
//   }

//   return diagonalGameState;
// }

function makeDiagonal(gameState) {
  const rows = gameState.length;
  const cols = gameState[0].length;
  let mainDiagonal = [];
  let secondaryDiagonal = [];

  for (let i = 0; i < rows; i++) {
    mainDiagonal.push(gameState[i][i]);
    secondaryDiagonal.push(gameState[i][cols - i - 1]);
  }

  return [mainDiagonal, secondaryDiagonal];
}

console.log(reorientVertical([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));
console.log(makeDiagonal([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]));
