const fs = require('fs');
const { join } = require('path');

const grid = fs
  .readFileSync(join(__dirname, './input.txt'), {
    encoding: 'utf-8',
  })
  .split('\n');

// let visibleTrees = 0;

// function visibleFromOneSide(height, row, col, grid) {

//   const treeRow = grid[row].split('')
//   const treeCol = grid.map((gridLine) => gridLine[col])
//   const smallerThanHeight = val => val < height;

//   const fromLeft = treeRow.filter((_, index) => index < col).every(smallerThanHeight);
//   const fromRight = treeRow.filter((_, index) => index > col).every(smallerThanHeight);
//   const fromTop = treeCol.filter((_, index) => index < row).every(smallerThanHeight);
//   const fromBottom = treeCol.filter((_, index) => index > row).every(smallerThanHeight);

//   return fromLeft || fromRight || fromTop || fromBottom;
// }

// grid.forEach((treesInRowString, row) => {
//   const treesInRow = treesInRowString.split('').map((val) => parseInt(val));
//   treesInRow.forEach((height, col) => {

//     if (row === 0 || row === treesInRow.length - 1 || col === 0 || col === grid.length - 1) {
//       visibleTrees += 1;
//       return;
//     }

//     if (visibleFromOneSide(height, row, col, grid)) {
//       visibleTrees += 1;
//       return;
//     }
//   });
// });

// - part 2

function viewInRow(height, row) {
  let view = 0;
  for (let i = 0; i < row.length; i++) {
    if (row[i] <= height) {
      view++;
    }
    if (row[i] >= height) {
      break;
    }
  }
  return view
}

function calcScenicScore(height, rowIndex, colIndex, treeRow, grid) {
  const treeCol = grid.map((gridLine) => parseInt(gridLine[colIndex]));

  const viewLeft = treeRow.filter((_, index) => index < colIndex).reverse();
  const fromLeft = viewInRow(height, viewLeft);

  const viewRight = treeRow.filter((_, index) => index > colIndex);
  const fromRight = viewInRow(height, viewRight);

  const viewTop = treeCol.filter((_, index) => index < rowIndex).reverse();
  const fromTop = viewInRow(height, viewTop);

  const viewBottom = treeCol.filter((_, index) => index > rowIndex);
  const fromBottom = viewInRow(height, viewBottom);

  return fromLeft * fromRight * fromTop * fromBottom;
}

let maxScore = 0;

grid.forEach((line, rowIndex) => {
  const treesInRow = line.split('').map((val) => parseInt(val));
  treesInRow.forEach((height, colIndex) => {
    const score = calcScenicScore(height, rowIndex, colIndex, treesInRow, grid);
    if (score > maxScore) {
      maxScore = score;
    }
  });
});

console.log(maxScore);
