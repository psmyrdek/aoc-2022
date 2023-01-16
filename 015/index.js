const fs = require('fs');
const { join } = require('path');

console.time('Matrix search')

const lines = fs
  .readFileSync(join(__dirname, './input.txt'), {
    encoding: 'utf-8',
  })
  .split('\n');

function calcDist(x1, x2, y1, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

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
const UPP_BOUND = 4000000

const blockedFields = {}

lines
  .map((line) => getSensorMetadata(line))
  .forEach((sensor, i) => {
    console.log(`Updating ${i} diamond`);
    const { x, y, beaconDist } = sensor;

    const minY = y - beaconDist >= 0 ? y - beaconDist : 0
    const maxY = y + beaconDist <= UPP_BOUND ? y + beaconDist : UPP_BOUND

    for (let i = minY; i <= maxY; i++) {

        const restX = Math.abs(Math.abs(i - y) - beaconDist)

        const leftBound = { x: (x - restX >= 0 ? x - restX : 0), y: i}
        const rightBound = { x: (x + restX <= UPP_BOUND ? x + restX : UPP_BOUND), y: i}

        if (!blockedFields[i]) {
            blockedFields[i] = []
        }

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
            console.timeEnd('Matrix search')
            throw new Error(`row: ${row}, ${JSON.stringify(rowBound)} ${JSON.stringify(bd)}`);
        }
        rowBound.right = bd.right
    })
  }
  
  console.log('sorted')

  