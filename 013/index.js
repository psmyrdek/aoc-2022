const fs = require('fs');
const { join } = require('path');

const packets = fs
  .readFileSync(join(__dirname, './input.txt'), {
    encoding: 'utf-8',
  })
  .split('\n')
  .filter((val) => val);

function deserializePacket(packet) {
  const symbols = packet.split('');
  const asArr = [];

  let nextBuff = '';
  const itemStack = [];

  function storeVal(value) {
    if (itemStack.length > 0) {
      itemStack[itemStack.length - 1].push(value);
    } else {
      asArr.push(value);
    }
  }

  symbols.forEach((sym) => {
    if (['[', ']', ','].includes(sym) && nextBuff.length > 0) {
      const num = parseInt(nextBuff);
      nextBuff = '';

      storeVal(num);
    }

    if (sym === '[') {
      const item = [];
      itemStack.push(item);
    } else if (parseInt(sym) > -1) {
      nextBuff += sym;
    } else if (sym === ']') {
      const lastItem = itemStack.pop();
      storeVal(lastItem);
    }
  });

  if (nextBuff.length > 0) {
    const num = parseInt(nextBuff);
    storeVal(num);
  }

  return asArr;
}

function exists(obj) {
  return obj !== undefined && (obj.hasOwnProperty('length') || parseInt(obj) > -1);
}

function asArray(item) {
  return item.hasOwnProperty('length') ? item : [item];
}

const ORDERS = {
  RIGHT: true,
  WRONG: false,
  UNDEF: -1,
};

function compare(leftVal, rightVal) {
  const maxLen = leftVal.length > rightVal.length ? leftVal.length : rightVal.length;

  let result = ORDERS.UNDEF;

  for (let i = 0; i < maxLen; i++) {
    const lItem = leftVal[i];
    const rItem = rightVal[i];

    if (!exists(lItem) || !exists(rItem)) {
      result = !exists(lItem) && exists([rItem]) ? ORDERS.RIGHT : ORDERS.WRONG;
      break;
    }

    if (lItem.hasOwnProperty('length') && rItem.hasOwnProperty('length')) {
      result = compare(lItem, rItem);
      if (result === ORDERS.UNDEF) {
        continue;
      } else {
        return result;
      }
    }

    if (lItem.hasOwnProperty('length') && !rItem.hasOwnProperty('length')) {
      result = compare(lItem, [rItem]);
      if (result === ORDERS.UNDEF) {
        continue;
      } else {
        return result;
      }
    }

    if (!lItem.hasOwnProperty('length') && rItem.hasOwnProperty('length')) {
      result = compare([lItem], rItem);
      if (result === ORDERS.UNDEF) {
        continue;
      } else {
        return result;
      }
    }

    if (lItem === rItem) {
      continue;
    } else {
      return lItem < rItem ? ORDERS.RIGHT : ORDERS.WRONG;
    }
  }

  return result;
}

packets.push('[[2]]');
packets.push('[[6]]');

const sorted = packets
  .map((p) => deserializePacket(p.substring(1, p.length - 1)))
  .sort((left, right) => (compare(left, right) ? -1 : 1))
  .map((val) => JSON.stringify(val));

const fSym = sorted.findIndex((val) => val === '[[2]]') + 1;
const sSym = sorted.findIndex((val) => val === '[[6]]') + 1;
console.log(fSym * sSym);

// let pair = 1;
// let sumOfPairs = 0;
// for (let i = 0; i < packets.length; i += 3) {
//   const left = deserializePacket(packets[i].substring(1, packets[i].length - 1));
//   const right = deserializePacket(packets[i + 1].substring(1, packets[i + 1].length - 1));

//   if (compare(left, right)) {
//     sumOfPairs += pair;
//   } else {
//   }
//   console.log('----');

//   pair += 1;
// }

// console.log(sumOfPairs);
