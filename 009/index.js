const fs = require('fs');
const { join } = require('path');

const stackLines = fs
  .readFileSync(join(__dirname, './stacks.txt'), {
    encoding: 'utf-8',
  }).split('\n')

const stacks = []

for (let i = 0; i < stackLines.length; i++) {

    let column = 0
    for (let j = 0; j < stackLines[i].split('').length; j += 4) {

        if (!stacks[column]) { stacks[column] = [] }

        if (stackLines[i][j] === '[' && stackLines[i][j + 2] === ']') {
            if (stacks[column]) {
                stacks[column] = [stackLines[i][j + 1], ...stacks[column]]
            }
        }
        column += 1
    }
}

const moves = fs
  .readFileSync(join(__dirname, './moves.txt'), {
    encoding: 'utf-8',
  })
  .split('\n')
  .map((line) =>
    line
      .split(' ')
      .map((val) => parseInt(val))
  )
  .map(val => ({ count: val[1], from: val[3], to: val[5]}))

moves.forEach(move => {

    for (let i = 0; i < move.count; i++) {
        stacks[move.to - 1].push(stacks[move.from - 1].pop())
    }

})

console.log(stacks.map(stack => stack[stack.length - 1]))