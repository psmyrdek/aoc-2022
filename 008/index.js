const fs = require('fs');
const { join } = require('path');

const grid = fs
  .readFileSync(join(__dirname, './input.txt'), {
    encoding: 'utf-8',
  })
  .split('\n');

let visibleTrees = 0;

function visibleFromLeft(height, row, col) {}

function visibleFromRight(height, row, col) {}

function visibleFromTheTop(height, row, col, grid) {}

function visibleFromTheBottom(height, row, col, grid) {}

grid.forEach((treesInRow, row) => {
  treesInRow.split('').forEach((height, col) => {
    if (height === '0') {
      console.log(`not a tree at ${row}x${col}`);
      return;
    }

    if (
      row === 0 ||
      row === treesInRow.length - 1 ||
      col === 0 ||
      col === grid.length - 1
    ) {
      console.log(`tree on the edge at ${row}x${col}`);
      visibleTrees += 1;
      return;
    }

    if (
      visibleFromLeft(height, row, col) ||
      visibleFromRight(height, row, col) ||
      visibleFromTheTop(height, row, col, grid) ||
      visibleFromTheBottom(height, row, col, grid)
    ) {
      console.log(`tree visible ${row}x${col}`);
      visibleTrees += 1;
      return;
    }
  });
});
