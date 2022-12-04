const fs = require('fs');
const { join } = require('path');

const file = fs.readFileSync(join(__dirname, './input.txt'), {
  encoding: 'utf-8',
});

const inventory = file.split('\n');

const triads = [];
for (let i = 0; i < inventory.length; i += 3) {
  triads.push([inventory[i].split(''), inventory[i + 1].split(''), inventory[i + 2].split('')]);
}

const sum = triads
  .map(
    (group) =>
      Array.from(new Set(group[0])).filter((char) => group[1].includes(char) && group[2].includes(char))[0]
  )
  .reduce((acc, next) => {
    const charCode = next.charCodeAt(0);
    if (charCode >= 97) {
      return (acc += charCode - 96);
    } else {
      return (acc += charCode - 38);
    }
  }, 0);

console.log(sum);
