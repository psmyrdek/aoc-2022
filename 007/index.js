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
    parent
  }
}

let filesystem = null;
let ptr = null;

const filesTable = []

for (let inputLine of input) {
  const comObj = getCommand(inputLine);

  switch (comObj.command) {
    case COMMANDS.CHANGE_DIR: {
      if (comObj.param.name === '..') {
        ptr = ptr.parent;
      } else {
        const matching = ptr && ptr.directories.filter(d => d.name === comObj.param.name)
        const dir = !!matching ? matching[0] : createDirectory(comObj.param.name, ptr)
        ptr = dir;
        if (!filesystem) {
          filesystem = dir
        }
      }
      break;
    }
    case COMMANDS.LIST_DIR: {
      break;
    }
    case COMMANDS.FILE_NAME: {
      const {name, size} = comObj.param
      const file = createFile(name, size, ptr)
      ptr.files.push(file);
      filesTable.push(file)
      break;
    }
    case COMMANDS.DIR_NAME: {
      ptr.directories.push(createDirectory(comObj.param.name, ptr));
      break;
    }
    default: {
      console.log('unknown command')
      break;
    }
  }
}

const dirSizes = {}

function increase(currDir, size) {
  const dirName = currDir.parent ? `${currDir.name}_${currDir.parent.name}` : currDir.name
  dirSizes[dirName] = dirSizes[dirName] ? dirSizes[dirName] + size : size
}

filesTable.forEach((file, index) => {
  let currDir = file.parent

  increase(currDir, file.size)
  while (currDir.parent) {
    increase(currDir.parent, file.size)
    currDir = currDir.parent
    if (currDir.parent === null) {
      increase(currDir, file.size)
    }
  }
})

const val = Object.entries(dirSizes).filter(([key, val]) => val <= 100000 )//.reduce((acc, [key, val]) => acc + val, 0)

console.log(val)