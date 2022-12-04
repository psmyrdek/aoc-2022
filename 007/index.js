const fs = require("fs");
const { join } = require("path");

const file = fs.readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8",
});

const assignments = file.split("\n");

let overlap = 0

assignments.forEach(pair => {
    const [firstPair, secondPair] = pair.split(',')
    const [firstMin, firstMax] = firstPair.split('-').map(val => parseInt(val))
    const [secondMin, secondMax] = secondPair.split('-').map(val => parseInt(val))

    const firstRange = firstMax - firstMin
    const secondRange = secondMax - secondMin

    if (firstRange >= secondRange) {
        if (firstMin <= secondMin && firstMax >= secondMax) {
            overlap += 1
        }
    } else if (secondRange > firstRange) {
        if (secondMin <= firstMin && secondMax >= firstMax) {
            overlap += 1
        }
    }
})

console.log(overlap)