const fs = require('fs')
const input = fs
  .readFileSync(`${__dirname}/input.txt`, 'utf8')
  .split('\n')
  .map((x) => x.split('').map(Number))
const maxIndex = input[0].length

const getArounds = (i, j) => {
  const top = [...[...Array(i).keys()].map((x) => input[x][j])].reverse()
  const right = [...Array(maxIndex).keys()].slice(j + 1).map((y) => input[i][y])
  const bottom = [...Array(maxIndex).keys()].slice(i + 1).map((x) => input[x][j])
  const left = [...[...Array(j).keys()].map((y) => input[i][y])].reverse()
  return [top, right, bottom, left]
}

const part1 = () =>
  input.reduce(
    (visibleTreesX, row, i) =>
      visibleTreesX +
      row.reduce((visibleTreesY, tree, j) => {
        const arounds = getArounds(i, j)
        if (arounds.some((x) => x.length === 0)) return visibleTreesY + 1
        if (arounds.some((x) => Math.max(...x) < tree)) return visibleTreesY + 1
        return visibleTreesY
      }, 0),
    0
  )
console.log(`[Part #1]: ${part1()}`) // 1832

const getDirectionDistance = (tree, directionTrees) => {
  if (directionTrees.length === 0) return 0
  const blockedTreeIndex = directionTrees.findIndex((x) => x >= tree) + 1
  if (blockedTreeIndex > 0) return directionTrees.slice(0, blockedTreeIndex).length
  return directionTrees.length
}

const part2 = () => {
  const scenicScores = input.reduce(
    (scoresX, row, i) => [
      ...scoresX,
      ...row.reduce((scenicScoresY, tree, j) => {
        const arounds = getArounds(i, j)
        return [
          ...scenicScoresY,
          arounds.reduce((score, direction) => score * getDirectionDistance(tree, direction), 1),
        ]
      }, []),
    ],
    []
  )

  return Math.max(...scenicScores)
}
console.log(`[Part #2]: ${part2()}`) // 157320
