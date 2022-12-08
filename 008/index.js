const fs = require('fs');
const { join } = require('path');

const grid = fs
  .readFileSync(join(__dirname, './input.txt'), {
    encoding: 'utf-8',
  })
  .split('\n');

let visibleTrees = 0;

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
  let counter = 0
  for (let i = 0; i < row.length; row++) {
    if (row[i] <= height) {
      counter++
    } else {
      break;
    }
  }
  return counter
}

function calcScenicScore(height, row, col, grid) {

    const treeRow = grid[row].split('')
    const treeCol = grid.map((gridLine) => gridLine[col])
  
    const viewLeft = treeRow.filter((_, index) => index < col).reverse()
    const fromLeft = viewInRow(height, viewLeft) || 1

    const viewRight = treeRow.filter((_, index) => index > col)
    const fromRight = viewInRow(height, viewRight) || 1

    const viewTop = treeCol.filter((_, index) => index < row).reverse()
    const fromTop = viewInRow(height, viewTop) || 1

    const viewBottom = treeCol.filter((_, index) => index > row)
    const fromBottom = viewInRow(height, viewBottom) || 1
  
    return fromLeft * fromRight * fromTop * fromBottom;
  }

let scenicScore = 0

grid.forEach((treesInRowString, row) => {
  const treesInRow = treesInRowString.split('').map((val) => parseInt(val));
  treesInRow.forEach((height, col) => {
    const score = calcScenicScore(height, row, col, grid)
    if (score > scenicScore) {
      scenicScore = score
    }
  });
});

console.log(scenicScore);
