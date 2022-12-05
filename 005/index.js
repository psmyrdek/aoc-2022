const fs = require('fs');
const { join } = require('path');

const file = fs.readFileSync(join(__dirname, './input.txt'), {
  encoding: 'utf-8',
});

const inventory = file.split('\n');

let sum = 0;

inventory.forEach((entry) => {
  const firstHalf = entry.substr(0, entry.length / 2);
  const secondHalf = entry.substr(entry.length / 2);

  const inBoth = entry
    .split('')
    .filter((item) => firstHalf.includes(item) && secondHalf.includes(item))[0];

  const charCode = inBoth.charCodeAt(0);
  if (charCode >= 97) {
    sum += charCode - 96;
  } else {
    sum += charCode - 38;
  }
});

console.log(sum);
