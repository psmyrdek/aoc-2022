// A - rock
// B - paper
// C - scissors

// X - rock
// Y - paper
// Z - scissors

// 0 - lost
// 3 - draw
// 6 - won

// 1 - rock
// 2 - paper
// 3 - scissors

const fs = require('fs')
const {join} = require('path')

const RESULTS = {
    LOST: 0,
    DRAW: 3,
    WON: 6
}

const SCORE_FOR_CALL = {
    ROCK: 1,
    PAPER: 2,
    SCISSORS: 3
}

function normalize(call) {
    const CALLS = {
        A: 'ROCK',
        B: 'PAPER',
        C: 'SCISSORS'
    }

    return CALLS[call]
}

function getScore(opponent, mine) {
    if (opponent === mine) {
        return RESULTS.DRAW
    } else if (opponent === 'ROCK') {
        if (mine === 'PAPER') {
            return RESULTS.WON
        } else {
            return RESULTS.LOST
        }
    } else if (opponent === 'PAPER') {
        if (mine === 'SCISSORS') {
            return RESULTS.WON
        } else {
            return RESULTS.LOST
        }
    } else if (opponent === 'SCISSORS') {
        if (mine === 'ROCK') {
            return RESULTS.WON
        } else {
            return RESULTS.LOST
        }
    }
}

function pickMyAction(opponentCall, action) {
    // X - lose
    // Y - draw
    // Z - win
    if (action === 'Y') { return opponentCall }
    else if (action === 'X') {
        if (opponentCall === 'ROCK') {
            return 'SCISSORS'
        } else if (opponentCall === 'PAPER') {
            return 'ROCK'
        } else if (opponentCall === 'SCISSORS') {
            return 'PAPER'
        }            
    } else if (action === 'Z') {
        if (opponentCall === 'ROCK') {
            return 'PAPER'
        } else if (opponentCall === 'PAPER') {
            return 'SCISSORS'
        } else if (opponentCall === 'SCISSORS') {
            return 'ROCK'
        }    
    }

}

const file = fs.readFileSync(join(__dirname, './input.txt'), { encoding: 'utf-8' })

const rounds = file.split('\n')

let score = 0

rounds.forEach(round => {
    const [opponent_raw, action] = round.split(' ')
    const opponentCall = normalize(opponent_raw)
    const myAction = pickMyAction(opponentCall, action)

    const roundScore = getScore(opponentCall, myAction)
    const scoreForCall = SCORE_FOR_CALL[myAction]
    score += roundScore + scoreForCall
})

console.log(score)