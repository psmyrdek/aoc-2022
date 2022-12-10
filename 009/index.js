const fs = require('fs');
const { join } = require('path');

const moves = fs
  .readFileSync(join(__dirname, './input.txt'), {
    encoding: 'utf-8',
  })
  .split('\n');

const knots = Array.from(new Array(10)).map(_ => ({ x: 0, y: 0 }))

const tailMoves = {}

function generateOptions(tail) {
    return [
        { x: tail.x - 1, y: tail.y + 1 },
        { x: tail.x, y: tail.y + 1 },
        { x: tail.x + 1, y: tail.y + 1},
        { x: tail.x - 1, y: tail.y },
        { x: tail.x + 1, y: tail.y },
        { x: tail.x - 1, y: tail.y - 1},
        { x: tail.x, y: tail.y - 1},
        { x: tail.x + 1, y: tail.y - 1}
    ]
}

function isAdjustmentNeeded(next, prev) {
    return ![
        { x: next.x, y: next.y },
        { x: next.x - 1, y: next.y + 1 },
        { x: next.x, y: next.y + 1 },
        { x: next.x + 1, y: next.y + 1},
        { x: next.x - 1, y: next.y },
        { x: next.x + 1, y: next.y },
        { x: next.x - 1, y: next.y - 1},
        { x: next.x, y: next.y - 1},
        { x: next.x + 1, y: next.y - 1}
    ].some(coord => coord.x === prev.x && coord.y === prev.y )
}

function updateKnotPosition(knot, x, y, knotIndex) {
    knot.x = x
    knot.y = y

    if (knotIndex === 0) {
        const key = `${x}x${y}`
        if (!tailMoves[key]) {
            tailMoves[key] = 1
        } else {
            tailMoves[key]++;
        }
    }
}

function getNextKnotPosition(knotMoved, knotToMove) {
    const moveOptions = generateOptions(knotToMove)
    const stickyKnots = moveOptions.filter(newTail => !isAdjustmentNeeded(knotMoved, newTail))
    const nextTail = stickyKnots.length > 1 ? stickyKnots.filter(newTail => newTail.x === knotMoved.x || newTail.y === knotMoved.y) : stickyKnots

    if (nextTail.length !== 1) {
        throw new Error('Found too many options for next move')
    }

    return nextTail[0]
}

for (let move of moves) {
  const [dir, steps] = move.split(' ');

  for (let i = 0; i < parseInt(steps); i++) {

    switch(dir) {
        case 'R':
            knots[9].x += 1;
            break;
        case 'L':
            knots[9].x -= 1;
            break;
        case 'U':
            knots[9].y += 1;
            break;
        case 'D':
            knots[9].y -= 1;
            break;
    }

    for (let i = 8; i >= 0; i--) {

        const knotMoved = knots[i + 1]
        const knotToMove = knots[i]

        if (isAdjustmentNeeded(knotMoved, knotToMove)) {
            const nextTail = getNextKnotPosition(knotMoved, knotToMove)
            updateKnotPosition(knotToMove, nextTail.x, nextTail.y, i)
        }

    }

  }
}

console.log(Object.entries(tailMoves).length + 1)
