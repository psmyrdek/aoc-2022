const fs = require('fs')
const {join} = require('path')

const file = fs.readFileSync(join(__dirname, './input.txt'), { encoding: 'utf-8' })

const calories = file.split('\n')

let groups = []
let group = 0

calories.forEach(entry => {
    const asCal = parseInt(entry)
    if (entry) {
        group += asCal
    } else {
        groups.push(group)
        group = 0
    }
})

const topThreeSum = groups.sort((a, b) => a > b ? -1 : a < b ? 1 : 0)

console.log(topThreeSum[0] + topThreeSum[1] + topThreeSum[2])