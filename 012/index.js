const fs = require('fs');
const { join } = require('path');

function generateMap() {
  return fs
    .readFileSync(join(__dirname, './input.txt'), {
      encoding: 'utf-8',
    })
    .split('\n')
    .map((line) => line.split(''));
}

const theMap = generateMap();

const INF = 9999;

function hFunc(node) {
  const dist = Math.abs(finish.col - node.col) + Math.abs(finish.row - node.col);
  return dist;
}

function nodeToHeight(node) {
  if (node.row < 0 || node.col < 0) {
    return INF;
  }

  if (node.row > theMap.length - 1) {
    return INF;
  }

  if (node.col > theMap[node.row].length - 1) {
    return INF;
  }

  const letter = theMap[node.row][node.col];
  const nodeChar = letter === 'S' ? 'a' : letter === 'E' ? 'z' : letter;
  return nodeChar ? nodeChar.charCodeAt(0) - 97 : INF;
}

function generateSuccessors(node) {
  const nodes = [
    {
      row: node.row - 1,
      col: node.col,
      q: node.q + 1,
    },
    {
      row: node.row,
      col: node.col - 1,
      q: node.q + 1,
    },
    {
      row: node.row,
      col: node.col + 1,
      q: node.q + 1,
    },
    {
      row: node.row + 1,
      col: node.col,
      q: node.q + 1,
    },
  ]
    .filter((sNode) => {
      const h1 = nodeToHeight(node);
      const h2 = nodeToHeight(sNode);

      return h2 - 1 <= h1;
    })
    .map((sNode) => ({ ...sNode, f: sNode.q + hFunc(node, sNode) }));

  return nodes;
}

function findInCollection(collection, node, f) {
  const itemsInRow = collection.filter((item) => item.row === node.row);
  const tryCols = itemsInRow.filter((item) => item.col === node.col);
  return tryCols.filter((item) => item.f < f).length > 0;
}

function pathfinder(start, finish) {
  let noOfSteps = 0;
  let openList = [start];
  let closedList = [];

  while (openList.length > 0) {
    const q = openList.sort((a, b) => a.f - b.f)[0];

    openList = openList.filter((node) => !(node.row === q.row && node.col === q.col));

    const successors = generateSuccessors(q);

    successors.forEach((node) => {
      if (node.row === finish.row && node.col === finish.col) {
        // Finish
        console.log(`For ${start.row}x${start.col} its ${node.q} steps`)
        noOfSteps = node.q;
        openList = [];
        return;
      }

      if (findInCollection(openList, node, node.f)) {
        return;
      }

      if (findInCollection(closedList, node, node.f)) {
        return;
      }

      openList.push(node);
    });

    closedList.push(q);
  }

  return noOfSteps;
}

//-------

const start = { row: 20, col: 0, f: 0, q: 0 };
const finish = { row: 20, col: 107 };

console.log(pathfinder(start, finish));
