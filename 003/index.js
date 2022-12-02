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

function normalize(opponent, mine) {
    const OPPO_CALLS = {
        A: 'ROCK',
        B: 'PAPER',
        C: 'SCISSORS'
    }

    const MINE_CALLS = {
        X: 'ROCK',
        Y: 'PAPER',
        Z: 'SCISSORS'
    }

    return [OPPO_CALLS[opponent], MINE_CALLS[mine]]
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

const file = fs.readFileSync(join(__dirname, './input.txt'), { encoding: 'utf-8' })

const rounds = file.split('\n')

let score = 0

rounds.forEach(round => {
    const [opponent_raw, mine_raw] = round.split(' ')
    const [opponent, mine] = normalize(opponent_raw, mine_raw)
    const roundScore = getScore(opponent, mine)
    const scoreForCall = SCORE_FOR_CALL[mine]
    score += roundScore + scoreForCall
})

console.log(score)