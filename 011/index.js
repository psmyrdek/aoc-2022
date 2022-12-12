const monkeys = {
    0: {
        items: [75, 63],
        op: item => item * 3,
        test: val => val % 11 === 0,
        testTrue: 7,
        testFalse: 2,
        inspections: 0
    },
    1: {
        items: [65, 79, 98, 77, 56, 54, 83, 94],
        op: item => item + 3,
        test: val => val % 2 === 0,
        testTrue: 2,
        testFalse: 0,
        inspections: 0
    },
    2: {
        items: [66],
        op: item => item + 5,
        test: val => val % 5 === 0,
        testTrue: 7,
        testFalse: 5,
        inspections: 0
    },
    3: {
        items: [51, 89, 90],
        op: item => item * 19,
        test: val => val % 7 === 0,
        testTrue: 6,
        testFalse: 4,
        inspections: 0
    },
    4: {
        items: [75, 94, 66, 90, 77, 82, 61],
        op: item => item + 1,
        test: val => val % 17 === 0,
        testTrue: 6,
        testFalse: 1,
        inspections: 0
    },
    5: {
        items: [53, 76, 59, 92, 95],
        op: item => item + 2,
        test: val => val % 19 === 0,
        testTrue: 4,
        testFalse: 3,
        inspections: 0
    },
    6: {
        items: [81, 61, 75, 89, 70, 92],
        op: item => item * item,
        test: val => val % 3 === 0,
        testTrue: 0,
        testFalse: 1,
        inspections: 0
    },
    7: {
        items: [81, 86, 62, 87],
        op: item => item + 8,
        test: val => val % 13 === 0,
        testTrue: 3,
        testFalse: 5,
        inspections: 0
    }
}

for (let i = 0; i < 20; i++) {
    console.log(`Round ${i}`)

    Object.keys(monkeys).forEach(monkeyKey => {
        const monk = monkeys[monkeyKey]

        let item = null
        while (item = monk.items.shift()) {
            const newVal = Math.ceil(monk.op(item) / 3)
            const testPassess = monk.test(newVal)
            if (testPassess) {
                monkeys[monk.testTrue].items.push(newVal)
            } else {
                monkeys[monk.testFalse].items.push(newVal)
            }
            monk.inspections++;
        }
    })

    console.log(monkeys)
}

const items = Object.values(monkeys).map(m => m.inspections).sort((a, b) => a > b ? -1 : a < b ? 1 : 0)
console.log(items)