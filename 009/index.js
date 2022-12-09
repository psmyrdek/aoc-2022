const fs = require('fs');
const { join } = require('path');

const moves = fs
  .readFileSync(join(__dirname, './input.txt'), {
    encoding: 'utf-8',
  })
  .split('\n');

let head = { x: 0, y: 0 };
let tail = { x: 0, y: 0 };

const tailMoves = {}

function isTailAdjustmentNeeded(head, tail) {
    return ![
        { x: head.x, y: head.y },
        { x: head.x - 1, y: head.y + 1 },
        { x: head.x, y: head.y + 1 },
        { x: head.x + 1, y: head.y + 1},
        { x: head.x - 1, y: head.y },
        { x: head.x + 1, y: head.y },
        { x: head.x - 1, y: head.y - 1},
        { x: head.x, y: head.y - 1},
        { x: head.x + 1, y: head.y - 1}
    ].some(coord => coord.x === tail.x && coord.y === tail.y )
}

function updateTail(x, y) {
    tail = { x, y }

    const key = `${x}x${y}`
    if (!tailMoves[key]) {
        tailMoves[key] = 1
    } else {
        tailMoves[key]++;
    }

    console.log(`${JSON.stringify(head)} ${JSON.stringify(tail)}`)
}

for (let move of moves) {
  const [dir, steps] = move.split(' ');

  console.log(move)

  for (let i = 0; i < parseInt(steps); i++) {

    switch(dir) {
        case 'R':
            head.x += 1;
            break;
        case 'L':
            head.x -= 1;
            break;
        case 'U':
            head.y += 1;
            break;
        case 'D':
            head.y -= 1;
            break;
    }

    console.log(`${JSON.stringify(head)} ${JSON.stringify(tail)}`)

    if (isTailAdjustmentNeeded(head, tail)) {
        console.log('Updating tail')
        switch(dir) {
            case 'R':
                updateTail(head.x - 1, head.y)
                break;
            case 'L':
                updateTail(head.x + 1, head.y)
                break;
            case 'U':
                updateTail(head.x, head.y - 1)
                break;
            case 'D':
                updateTail(head.x, head.y + 1)
                break;
        }
    }

  }
}

console.log(Object.entries(tailMoves).length + 1)