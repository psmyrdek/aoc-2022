const fs = require('fs');
const { join } = require('path');

const lines = fs
  .readFileSync(join(__dirname, './input.txt'), {
    encoding: 'utf-8',
  })
  .split('\n');

function createCave() {
  const cave = [];
  for (let i = 0; i < 180; i++) {
    const row = [];
    for (let j = 0; j < 1000; j++) {
      row.push(' ');
    }
    cave.push(row);
  }
  return cave;
}

function renderCave(cave, sand) {
  const toRender = [];
  cave.forEach((caveLine, rowIndex) => {
    const cavePart = [];
    caveLine.forEach((item, colIndex) => {
      if (colIndex > 450 && colIndex < 600) {
        if (rowIndex === sand.row && colIndex === sand.col) {
          cavePart.push('o');
        } else {
          cavePart.push(item);
        }
      }
    });
    toRender.push(cavePart.join(''));
  });
  fs.writeFileSync('014/cave.json', JSON.stringify(toRender, null, 2));
}

function createCaveLine(fromRow, fromCol, toRow, toCol, cave) {
  // console.log(`Drawing from: ${fromCol}x${fromRow} to: ${toCol}x${toRow}`)

  if (fromRow !== toRow) {
    const from = fromRow < toRow ? fromRow : toRow;
    const to = from === fromRow ? toRow : fromRow;

    for (let i = from; i <= to; i++) {
      // console.log(`Drawing ${fromCol}x${i}`)
      cave[i][fromCol] = '#';
    }
  }

  if (fromCol !== toCol) {
    const from = fromCol < toCol ? fromCol : toCol;
    const to = from === fromCol ? toCol : fromCol;

    for (let i = from; i <= to; i++) {
      // console.log(`Drawing ${i}x${fromRow}`)
      cave[fromRow][i] = '#';
    }
  }
}

function getNextMove(cave, sand) {
  const banned = ['#', 'o'];

  if (!banned.includes(cave[sand.row + 1][sand.col])) {
    return { row: sand.row + 1, col: sand.col };
  }

  if (!banned.includes(cave[sand.row + 1][sand.col - 1])) {
    return { row: sand.row + 1, col: sand.col - 1 };
  }

  if (!banned.includes(cave[sand.row + 1][sand.col + 1])) {
    return { row: sand.row + 1, col: sand.col + 1 };
  }

  return false;
}

function canMove(cave, sand) {
  const move = getNextMove(cave, sand);

  return move !== false;
}

function moveSand(cave, sand) {
  const move = getNextMove(cave, sand);
  sand.row = move.row;
  sand.col = move.col;
}

function renderFrame(cave, sand) {
  if (canMove(cave, sand)) {
    moveSand(cave, sand);
  } else {
    cave[sand.row][sand.col] = 'o';
    throw new Error('End of moves');
  }
}

function render(cave, delayMs, iter, sand = { row: 0, col: 500 }) {
  setTimeout(() => {
    if (iter % 200 === 0) {
      renderCave(cave, sand);
      fs.writeFileSync('014/save.json', JSON.stringify({ iter, cave }), {encoding: 'utf-8'})
    }
    try {
      renderFrame(cave, sand);
      render(cave, delayMs, iter, sand);
    } catch (e) {
      // console.log(`Sand stopped at iter:${iter} and ${JSON.stringify(sand)}`);
      iter += 1;
      render(cave, delayMs, iter);
    }
  }, delayMs);
}

const cave = createCave();

lines.forEach((line) => {
  const coords = line.split(' -> ');

  for (let i = 0; i < coords.length - 1; i++) {
    const [fromCol, fromRow] = coords[i].split(',');
    const [toCol, toRow] = coords[i + 1].split(',');

    createCaveLine(parseInt(fromRow), parseInt(fromCol), parseInt(toRow), parseInt(toCol), cave);
  }

  // coords.forEach((coord) => {
  //   const [col, row] = coord.split(',');
  //   cave[row][col] = '#';
  // });
});

render(cave, 0, 1);
