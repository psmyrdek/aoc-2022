from threading import Thread
path = '/Users/przemek/dev/aoc-2022/015/input.txt'

file = open(path, 'r').readlines()

def calc_dist(x1, x2, y1, y2):
    return abs(x1 - x2) + abs(y1 - y2)

def get_metadata(line):
    sensorData, beaconData = line.rstrip().split(': ')
    sX, sY = map(lambda val: int(val), sensorData.split(', '))
    bX, bY = map(lambda val: int(val), beaconData.split(', '))
    dist = calc_dist(sX, bX, sY, bY)
    return {'x': sX, 'y': sY, 'dist': dist}

def scan_area(bound, file):
    xMin, xMax = bound['x']
    yMin, yMax = bound['y']

    print(f'Start scanning {xMin}->{xMax} and {yMin}->{yMax}')
    for i in range(xMin, xMax):
        for j in range(yMin, yMax):
            notInField = all(s['dist'] < calc_dist(s['x'], i, s['y'], j) for s in map(get_metadata, file))
            if (notInField):
                print(f'Found {i}x{j}')
                break
            print(f'{i}x{j}')
                


bounds = [
    {
        'x': [0, 999999],
        'y': [0, 999999]
    },
    {
        'x': [1000000, 1999999],
        'y': [0, 999999]
    },
    {
        'x': [2000000, 2999999],
        'y': [0, 999999]
    },
    {
        'x': [3000000, 4000000],
        'y': [0, 999999]
    },
    {
        'x': [0, 999999],
        'y': [1000000, 1999999]
    },
    {
        'x': [1000000, 1999999],
        'y': [1000000, 1999999]
    },
    {
        'x': [2000000, 2999999],
        'y': [1000000, 1999999]
    },
    {
        'x': [3000000, 4000000],
        'y': [1000000, 1999999]
    },
    {
        'x': [0, 999999],
        'y': [2000000, 2999999]
    },
    {
        'x': [1000000, 1999999],
        'y': [2000000, 2999999]
    },
    {
        'x': [2000000, 2999999],
        'y': [2000000, 2999999]
    },
    {
        'x': [3000000, 4000000],
        'y': [2000000, 2999999]
    },
    {
        'x': [0, 999999],
        'y': [3000000, 4000000]
    },
    {
        'x': [1000000, 1999999],
        'y': [3000000, 4000000]
    },
    {
        'x': [2000000, 2999999],
        'y': [3000000, 4000000]
    },
    {
        'x': [3000000, 4000000],
        'y': [3000000, 4000000]
    },
]

bds = [
    {
        'x': [0, 999999],
        'y': [0, 999999]
    },
]

for bound in bounds:
    print(bound)
    task = Thread(target=scan_area, args=(bound, file))
    task.start()