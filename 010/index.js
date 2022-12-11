const fs = require('fs');
const { join } = require('path');

const instructions = fs
  .readFileSync(join(__dirname, './input.txt'), {
    encoding: 'utf-8',
  })
  .split('\n');


let register = 1
let cycle = 1
let instruction = null
let sum = 0

function checkCycle() {
  if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
    sum += cycle * register
  }
}

function nextTick() {
  cycle += 1
  checkCycle()
}

while (instruction = instructions.shift()) {

  if (instruction.startsWith('addx')) {
    console.log(`addx - Cycle: ${cycle}`)
    
    nextTick()

    const value = parseInt(instruction.split(' ')[1])
    register += value

    nextTick()
  }

  if (instruction === 'noop') {
    console.log(`noop - Cycle: ${cycle}`)
    nextTick()
  }

}

console.log(sum)