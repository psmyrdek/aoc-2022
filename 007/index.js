const fs = require('fs');
const { join } = require('path');

const input = fs.readFileSync(join(__dirname, './input.txt'), {
  encoding: 'utf-8',
}).split('/')

const filesystem = {
    ['/']: {
        files: [],
        directories: []
    }
}

for (let inputLine of input) {
    
}