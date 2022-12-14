function getDirs(point, map) {
  const options = [
    { row: point.row - 1, col: point.col - 1 },
    { row: point.row - 1, col: point.col },
    { row: point.row - 1, col: point.col + 1 },
    { row: point.row, col: point.col - 1 },
    { row: point.row, col: point.col + 1},
    { row: point.row + 1, col: point.col - 1 },
    { row: point.row + 1, col: point.col },
    { row: point.row + 1, col: point.col + 1 },
  ];

  return options.filter(pointCandite => {
    const exists = map[pointCandite.row] && map[pointCandite.row][pointCandite.col] != null

    const newPointVal = map[pointCandite.row][pointCandite.col]
    const currPointVal = map[point.row][point.col]
    const canGo = newPointVal >= currPointVal && newPointVal - currPointVal <= 1
    
    return exists && canGo
  });
}

module.exports.getDirs = getDirs;
