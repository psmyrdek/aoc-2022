const fs = require('fs');
const { join } = require('path');

const input = fs
  .readFileSync(join(__dirname, './input.txt'), {
    encoding: 'utf-8',
  })
  .split('\n');

const COMMANDS = {
  CHANGE_DIR: 'CHANGE_DIR',
  LIST_DIR: 'LIST_DIR',
  DIR_NAME: 'DIR_NAME',
  FILE_NAME: 'FILE_NAME',
};

function getCommand(inputLine) {
  if (inputLine.startsWith('$ cd')) {
    return { command: COMMANDS.CHANGE_DIR, param: { name: inputLine.split(' ')[2] } };
  } else if (inputLine.startsWith('$ ls')) {
    return { command: COMMANDS.LIST_DIR };
  } else if (inputLine.startsWith('dir')) {
    return { command: COMMANDS.DIR_NAME, param: { name: inputLine.split(' ')[1] } };
  } else {
    return {
      command: COMMANDS.FILE_NAME,
      param: { name: inputLine.split(' ')[1], size: parseInt(inputLine.split(' ')[0]) },
    };
  }
}

function createDirectory(name, parent) {
  return {
    name,
    files: [],
    directories: [],
    parent,
  };
}

function createFile(name, size, parent) {
  return {
    name,
    size,
    parent,
  };
}

let filesystem = null;
let ptr = null;

const filesTable = []

function updateFilesTable(file) {

  let path = `${file.name}`
  let fileParent = file.parent

  do {
    path = `${fileParent.name}|${path}`
    fileParent = fileParent.parent
  } while(fileParent)

  filesTable.push({
    path,
    size: file.size
  })
}

for (let inputLine of input) {
  const comObj = getCommand(inputLine);

  switch (comObj.command) {
    case COMMANDS.CHANGE_DIR: {
      if (comObj.param.name === '..') {
        ptr = ptr.parent;
      } else {
        const matching = ptr && ptr.directories.filter((d) => d.name === comObj.param.name);
        const dir = !!matching ? matching[0] : createDirectory(comObj.param.name, ptr);
        ptr = dir;
        if (!filesystem) {
          filesystem = dir;
        }
      }
      break;
    }
    case COMMANDS.FILE_NAME: {
      const { name, size } = comObj.param;
      const file = createFile(name, size, ptr);
      ptr.files.push(file);
      updateFilesTable(file);
      break;
    }
    case COMMANDS.DIR_NAME: {
      ptr.directories.push(createDirectory(comObj.param.name, ptr));
      break;
    }
    default: {
      break;
    }
  }
}

const dirSizes = {}

filesTable.forEach(tableEntry => {
  const arr = tableEntry.path.split('|')
  while(arr.length > 1) {
    arr.pop()
    const filePath = arr.join('|')
    dirSizes[filePath] = dirSizes[filePath] ? dirSizes[filePath] + tableEntry.size : tableEntry.size
  }
})

//part 1
const val = Object.entries(dirSizes).filter(([key, val]) => val <= 100000 ).reduce((acc, [key, val]) => acc + val, 0)
console.log(`Sum of dirs larger than threshold: ${val}`)

//part 2
const sorted = Object.entries(dirSizes).sort(([aKey, aVal], [bKey, bVal]) => bVal > aVal ? 1 : bVal < aVal ? -1 : 0)

const available = 70000000
const threshold = 30000000
const used = sorted[0][1]

const toDelete = threshold - (available - used)

const candidates = sorted.filter(val => val[1] > toDelete)
console.log(`First dir size to remove to conduct update: ${candidates.pop()[1]}`)