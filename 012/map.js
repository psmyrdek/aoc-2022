module.exports.getNumericalMap = function (theMap) {
  let start = {};
  let finish = {};

  const allRows = theMap.split('\n')
  const map = allRows.map((line, x) =>
    line.split('').map((letter, y) => {
      if (letter === 'S') {
        start = { row: x, col: y  };
        return 'a'.charCodeAt() - 97;
      } else if (letter === 'E') {
        finish = { row: x, col: y  };
        return 'z'.charCodeAt() - 97;
      }

      return letter.charCodeAt() - 97;
    })
  );

  return [map, start, finish];
};

module.exports.renderMap = function(map) {
  console.clear()
  map.forEach((line, index) => {
    if (index > 5 && index < 30) {
      console.log(line.map(numb => String.fromCharCode(numb + 97)).join(''))
    }
    
  })
}
