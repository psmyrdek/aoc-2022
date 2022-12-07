const fs = require('fs');
const { join } = require('path');

const input = fs.readFileSync(join(__dirname, './input.txt'), {
  encoding: 'utf-8',
});

let signal = 0;
for (let i = 13; i < input.length; i++) {
  
  const arr = Array.from(new Set([
    input[i - 13],
    input[i - 12],
    input[i - 11],
    input[i - 10],
    input[i - 9],
    input[i - 8],
    input[i - 7],
    input[i - 6],
    input[i - 5],
    input[i - 4],
    input[i - 3],
    input[i - 2],
    input[i - 1],
    input[i],
  ]));

  console.log(arr.length)

  if (arr.length === 14) {
    signal = i + 1;
    console.log(signal);
    return;
  }
}

console.log(signal);
