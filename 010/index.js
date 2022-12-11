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

const screen = []

function nextTick() {

  const sprite = [register - 1, register, register + 1]
  screen.push(sprite.includes(cycle % 40) ? '#' : ' ')

  cycle += 1

}

while (instruction = instructions.shift()) {

  if (instruction.startsWith('addx')) {
    nextTick()

    const value = parseInt(instruction.split(' ')[1])
    register += value

    nextTick()
  }

  if (instruction === 'noop') {
    nextTick()
  }

}

const screenLet = screen.join('')

console.log('\n')
console.log(screenLet.substring(0, 39))
console.log(screenLet.substring(40, 79))
console.log(screenLet.substring(80, 119))
console.log(screenLet.substring(120, 159))
console.log(screenLet.substring(160, 199))
console.log(screenLet.substring(200, 239))
console.log('\n')