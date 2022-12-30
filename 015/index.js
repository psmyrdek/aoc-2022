const fs = require('fs');
const { join } = require('path');

const lines = fs
  .readFileSync(join(__dirname, './input.txt'), {
    encoding: 'utf-8',
  })
  .split('\n');

function calcDist(x1, x2, y1, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

// function getPointCoords(line, beacons) {
//     const [sensorData, beaconData] = line.split(': ')
//     const [sX, sY] = sensorData.split(', ').map(val => parseInt(val))
//     const [bX, bY] = beaconData.split(', ').map(val => parseInt(val))
//     const manhattanDist = calcDist(sX, bX, sY, bY)

//     beacons.add(`${bX}_${bY}`)

//     const minBoundary = {x: sX - manhattanDist, y: sY - manhattanDist};
//     const maxBoundary = {x: sX + manhattanDist, y: sY + manhattanDist};

//     console.log(`Boundary for ${sX}x${sY} with d=${manhattanDist}: ${JSON.stringify(minBoundary)} to ${JSON.stringify(maxBoundary)}`);

//     const coords = []

//     if (minBoundary.y <= LINE_TO_CHECK && maxBoundary.y >= LINE_TO_CHECK) {
//         console.log(`${minBoundary.y} <= ${LINE_TO_CHECK} <= ${maxBoundary.y}`)
//         for (let i = minBoundary.x; i <= maxBoundary.x; i++) {
//             const locDist = calcDist(sX, i, sY, LINE_TO_CHECK)
//             if (locDist <= manhattanDist) {
//                 coords.push({x: i, y: LINE_TO_CHECK})
//             }
//         }
//     } else {
//         console.log(`Skipping for ${JSON.stringify(sensorData)}`)
//     }

//     return coords
// }

// const beacons = new Set()

// const data = lines.map((line, i) => {
//     console.log(`Calculating for ${i}`)
//     return getPointCoords(line, beacons)
// })

// const result = new Set()

// data.forEach(d => {
//     d.forEach(c => {
//         const key = `${c.x}_${c.y}`
//         if (!beacons.has(key)) {
//             result.add(key)
//         }
//     })
// })

// console.log(result.size);

// const LOW_BOUND = 0
// const UPP_BOUND = 4000000

// for (let i = LOW_BOUND; i <= UPP_BOUND; i++) {
//     for (let j = LOW_BOUND; j<= UPP_BOUND; j++) {
//         const notInField = sensors.every(s => s.beaconDist < calcDist(s.x, i, s.y, j))
//         if (notInField) {
//             console.log(`Found ${i}x${j}`)
//             break;
//         }
//     }
// }

function getSensorMetadata(line) {
  const [sensorData, beaconData] = line.split(': ');
  const [sX, sY] = sensorData.split(', ').map((val) => parseInt(val));
  const [bX, bY] = beaconData.split(', ').map((val) => parseInt(val));
  const manhattanDist = calcDist(sX, bX, sY, bY);

  return {
    x: sX,
    y: sY,
    beaconDist: manhattanDist,
  };
}

// const LOW_BOUND = 0
// const UPP_BOUND = 1000000

// const sensors = lines.map((line) => getSensorMetadata(line))

// for (let i = LOW_BOUND; i <= 1000000; i++) {
//     for (let j = LOW_BOUND; j<= 100; j++) {
//         const notInField = sensors.every(s => s.beaconDist < calcDist(s.x, i, s.y, j))
//         if (notInField) {
//             console.log(`Found ${i}x${j}`)
//             break;
//         }

//         if (i % 10000) {
//             console.log(i);
//         }
//     }
// }

// console.log('Finish - not found')

// console.log('Generating grid...');

// for (let i = 0; i <= MAX_VAL; i++) {
//   let row = [];
//   for (let j = 0; j <= MAX_VAL; j++) {
//     row.push(true);
//   }
// }

// console.log('Grid generated, finding holes...');

const UPP_BOUND = 4000000

const blockedFields = {}

function extendBounds(row, left, right) {

    if (blockedFields[row].length === 0) {
        blockedFields[row].push({left, right})
        return;
    }

    if (blockedFields[row].length === 1) {

        const curr = blockedFields[row][0]

        if (right < curr.left || left > curr.right) {
            console.log(`new item ${row}`)
        }

        if (left >= curr.left && right <= curr.right) {
            //smaller than already added
            return;
        }

        if (left < curr.left) {
            curr.left = left
        }

        if (right > curr.right) {
            curr.right = right
        }

    }

    if (blockedFields[row].length > 1) {
        console.log(`multiple ${row}`)
    }

}

lines
  .map((line) => getSensorMetadata(line))
  .forEach((sensor, i) => {
    console.log(`Updating ${i} diamond`);
    const { x, y, beaconDist } = sensor;

    const minY = y - beaconDist >= 0 ? y - beaconDist : 0
    const maxY = y + beaconDist <= UPP_BOUND ? y + beaconDist : UPP_BOUND

    for (let i = minY; i <= maxY; i++) {

        // console.log(`Updating sensor at ${x}x${y}, row ${i}`);

        const restX = Math.abs(Math.abs(i - y) - beaconDist)

        const leftBound = { x: (x - restX >= 0 ? x - restX : 0), y: i}
        const rightBound = { x: (x + restX <= UPP_BOUND ? x + restX : UPP_BOUND), y: i}

        if (!blockedFields[i]) {
            blockedFields[i] = []
        }

        // extendBounds(i, leftBound.x, rightBound.x)
        blockedFields[i].push({left: leftBound.x, right: rightBound.x})
    }

    console.log(`Created ${i} diamond`);
  });

  for (let row = 0; row <= UPP_BOUND; row++) {
    blockedFields[row] = blockedFields[row].sort((a, b) => a.left - b.left)
    rowBound = {left: blockedFields[row][0].left, right: blockedFields[row][0].right}
    blockedFields[row].forEach(bd => {
        if (bd.left >= rowBound.left && bd.right <= rowBound.right) {
            return;
        }
        if (rowBound.right < bd.left) {
            console.log(blockedFields[row])
            throw new Error(`row: ${row}, ${JSON.stringify(rowBound)} ${JSON.stringify(bd)}`);
        }
        rowBound.right = bd.right
    })
  }
  
  console.log('sorted')
