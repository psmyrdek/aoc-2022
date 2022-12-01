const fs = require('fs')
const {join} = require('path')

const file = fs.readFileSync(join(__dirname, './input.txt'), { encoding: 'utf-8' })

const calories = file.split('\n')

let max = 0
let group = 0

calories.forEach(entry => {
    const asCal = parseInt(entry)
    if (entry) {
        group += asCal
    } else {
        if (group > max) {
            max = group
        }
        group = 0
    }
})

console.log(max)