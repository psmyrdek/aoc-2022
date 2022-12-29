const fs = require('fs');
const { join } = require('path');

const lines = fs
  .readFileSync(join(__dirname, './input.txt'), {
    encoding: 'utf-8',
  })
  .split('\n');

const LINE_TO_CHECK = 2000000

function calcDist(x1, x2, y1, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2)
}

function getPointCoords(line, beacons) {
    const [sensorData, beaconData] = line.split(': ')
    const [sX, sY] = sensorData.split(', ').map(val => parseInt(val))
    const [bX, bY] = beaconData.split(', ').map(val => parseInt(val))
    const manhattanDist = calcDist(sX, bX, sY, bY)

    beacons.add(`${bX}_${bY}`)

    const minBoundary = {x: sX - manhattanDist, y: sY - manhattanDist};
    const maxBoundary = {x: sX + manhattanDist, y: sY + manhattanDist};
    
    console.log(`Boundary for ${sX}x${sY} with d=${manhattanDist}: ${JSON.stringify(minBoundary)} to ${JSON.stringify(maxBoundary)}`);

    const coords = []

    if (minBoundary.y <= LINE_TO_CHECK && maxBoundary.y >= LINE_TO_CHECK) {
        console.log(`${minBoundary.y} <= ${LINE_TO_CHECK} <= ${maxBoundary.y}`)
        for (let i = minBoundary.x; i <= maxBoundary.x; i++) {
            const locDist = calcDist(sX, i, sY, LINE_TO_CHECK)
            if (locDist <= manhattanDist) {
                coords.push({x: i, y: LINE_TO_CHECK})
            }
        }
    } else {
        console.log(`Skipping for ${JSON.stringify(sensorData)}`)
    }

    return coords
}

const beacons = new Set()

const data = lines.map((line, i) => {
    console.log(`Calculating for ${i}`)
    return getPointCoords(line, beacons)
})

const result = new Set()

data.forEach(d => {
    d.forEach(c => {
        const key = `${c.x}_${c.y}`
        if (!beacons.has(key)) {
            result.add(key)
        }
    })
})

console.log(result.size);
