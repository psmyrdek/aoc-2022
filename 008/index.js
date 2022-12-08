const fs = require('fs');
const { join } = require('path');

const grid = fs
  .readFileSync(join(__dirname, './input.txt'), {
    encoding: 'utf-8',
  })
  .split('\n');

let visibleTrees = 0;

function visibleFromOneSide(height, row, col, grid) {

  const treeRow = grid[row].split('')
  const treeCol = grid.map((gridLine) => gridLine[col])
  const smallerThanHeight = val => val < height;

  const fromLeft = treeRow.filter((_, index) => index < col).every(smallerThanHeight);
  const fromRight = treeRow.filter((_, index) => index > col).every(smallerThanHeight);
  const fromTop = treeCol.filter((_, index) => index < row).every(smallerThanHeight);
  const fromBottom = treeCol.filter((_, index) => index > row).every(smallerThanHeight);

  return fromLeft || fromRight || fromTop || fromBottom;
}

grid.forEach((treesInRowString, row) => {
  const treesInRow = treesInRowString.split('').map((val) => parseInt(val));
  treesInRow.forEach((height, col) => {

    if (row === 0 || row === treesInRow.length - 1 || col === 0 || col === grid.length - 1) {
      visibleTrees += 1;
      return;
    }

    if (visibleFromOneSide(height, row, col, grid)) {
      visibleTrees += 1;
      return;
    }
  });
});

console.log(visibleTrees);
