const fs = require('fs');
const { join } = require('path');
const { getNumericalMap, renderMap } = require('./map');
const { getDirs } = require('./directions');

const theMap = fs
  .readFileSync(join(__dirname, './input.txt'), {
    encoding: 'utf-8',
  })
  .split('\n')
  .map((line) => line.split(''));

const start = { row: 20, col: 0 };
const finish = { row: 20, col: 107 };

const priority = Math.abs(finish.col - start.col) > Math.abs(finish.row - start.row) ? 'H' : 'V';

function tryMoves(priority, point) {
  switch (priority) {
    case 'H': {
      return point.col < finish.col ? ['R', 'T', 'D', 'L'] : ['L', 'T', 'D', 'R'];
    }
    case 'V': {
      return point.row < finish.row ? ['D', 'L', 'R', 'T'] : ['T', 'L', 'R', 'D'];
    }
  }
}

function moveToCoord(move, point) {
  switch (move) {
    case 'L':
      return { row: point.row, col: point.col - 1 };
    case 'R':
      return { row: point.row, col: point.col + 1 };
    case 'T':
      return { row: point.row + 1, col: point.col };
    case 'D':
      return { row: point.row - 1, col: point.col };
  }
}

function getDistance(start, end) {
  return Math.abs(start.row - end.row) + Math.abs(start.col - end.col)
}

function canGo(from, to) {
  const exists = theMap[to.row] != null && theMap[to.row][to.col] != null
  if (!exists) {
    return false;
  }

  const currVal = theMap[from.row][from.col]  
  const nextVal = theMap[to.row][to.col]

  return nextVal >= currVal && Math.abs(nextVal - currVal) <= 1
}

const moves = tryMoves(priority, start);
const nextPoints = moves
  .map((move) => moveToCoord(move, start))
  .map((newPoint) => getDistance(newPoint, finish));

console.log(nextPoints)
