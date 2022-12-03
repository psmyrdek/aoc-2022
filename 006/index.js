const fs = require("fs");
const { join } = require("path");

const file = fs.readFileSync(join(__dirname, "./input.txt"), {
  encoding: "utf-8",
});

const inventory = file.split("\n");

let groups = []
let currGroup = []

inventory.forEach((entry, index) => {
  switch (index % 3) {
    case 0: {
      currGroup.push(entry)
      break;
    }
    case 1: {
      currGroup.push(entry)
      break;
    }
    case 2: {
      currGroup.push(entry)
      groups.push(currGroup)
      currGroup = []
      break;
    }
  }

})

const sum = groups.map(group => [
  Array.from(new Set([...group[0]])),
  Array.from(new Set([...group[1]])),
  Array.from(new Set([...group[2]])),
]).map(([uniq1, uniq2, uniq3]) => {
  return [...uniq1, ...uniq2, ...uniq3].filter(char => uniq1.includes(char) && uniq2.includes(char) && uniq3.includes(char))[0]
}).reduce((acc, next) => {
  const charCode = next.charCodeAt(0)
  if (charCode >= 97) {
    return acc += charCode - 96
  } else {
    return acc += charCode - 38
  }
}, 0)

console.log(sum)