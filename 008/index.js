const fs = require('fs');
const { join } = require('path');

const file = fs.readFileSync(join(__dirname, './input.txt'), {
  encoding: 'utf-8',
});

const assignments = file.split('\n');

let overlap = 0;

assignments.forEach((pair) => {
  const [firstPair, secondPair] = pair.split(',');
  const [firstMin, firstMax] = firstPair.split('-').map((val) => parseInt(val));
  const [secondMin, secondMax] = secondPair.split('-').map((val) => parseInt(val));

  const ranges = [];
  for (let i = firstMin; i <= firstMax; i++) {
    ranges.push(i);
  }
  for (let i = secondMin; i <= secondMax; i++) {
    ranges.push(i);
  }

  const hasOverlapping =
    ranges.filter((val) => ranges.indexOf(val) !== ranges.lastIndexOf(val)).length > 0;
  if (hasOverlapping) {
    overlap += 1;
  }
});

console.log(overlap);
