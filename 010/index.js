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

let ram = {}

while (instruction = instructions.shift()) {



  console.log(`Cycle: ${cycle}; Instruction: ${instruction}`)

  if (instruction.startsWith('addx')) {
    const value = parseInt(instruction.split(' ')[1])
    const executeWhen = cycle + 1

    if (ram[executeWhen]) {
      throw new Error('Malfunction')
    } else {
      console.log(`Storing ${value} to execute during ${executeWhen} cycle`)
      ram[executeWhen] = value
    }
  }

  if (ram[cycle]) {
    console.log(`Modifying register by ${ram[cycle]}`)
    register += ram[cycle]
    delete ram[cycle]
  }

  if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
    sum += cycle * register
  }

  cycle += 1

}

console.log(sum)