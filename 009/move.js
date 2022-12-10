const fs = require('fs');
const { join } = require('path');
const prompt = require('prompt-sync')();

const knots = [
    { key: 'H', pos: { x: 0, y: 0 }},
    { key: 1 , pos: { x: 0, y: 0 }},
    { key: 2 , pos: { x: 0, y: 0 }},
    { key: 3 , pos: { x: 0, y: 0 }},
    { key: 4 , pos: { x: 0, y: 0 }},
    { key: 5 , pos: { x: 0, y: 0 }},
    { key: 6 , pos: { x: 0, y: 0 }}
]

const stages = fs
  .readFileSync(join(__dirname, './test.txt'), {
    encoding: 'utf-8',
  })
  .split('------').map(val => val.split('\n').filter(line => line))


let stag = 0

function modify() {
    let key = prompt({sigint: true})
    stag = key === ',' ? stag - 1 : stag + 1
    return 'x'
}

do {
    console.clear()
    const currentStage = stages[stag]
    currentStage.forEach(stageLine => {
        console.log(stageLine)
    })

} while ( modify() )