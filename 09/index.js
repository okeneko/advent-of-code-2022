const fs = require('fs')
const input = fs
  .readFileSync(`${__dirname}/input.txt`)
  .toString()
  .split('\n')
  .map((x) => x.split('').map(Number))

const part1 = () => {
  const lowPoints = input
    .map((x, i) =>
      x.filter((y, j) => {
        const top = input[i - 1]?.[j]
        const right = input[i][j + 1]
        const bottom = input[i + 1]?.[j]
        const left = input[i][j - 1]
        return [top, right, bottom, left].filter((a) => !isNaN(a)).every((b) => b > y)
      })
    )
    .flat()
  return lowPoints.length + lowPoints.reduce((a, x) => a + x, 0)
}
console.log(`[Part #1]: ${part1()}`)

const part2 = () => {
  const lowPoints = input
    .map((x, i) =>
      x.map((y, j) => {
        const top = input[i - 1]?.[j]
        const right = input[i][j + 1]
        const bottom = input[i + 1]?.[j]
        const left = input[i][j - 1]
        return [top, right, bottom, left].filter((a) => !isNaN(a)).every((b) => b > y)
          ? [i, j]
          : null
      })
    )
    .flat()
    .filter((x) => !!x)

  let points = input.map((x) => x.map((_) => false))

  const calculateBasin = (x, y) => {
    if (isNaN(input[x]?.[y]) || input[x]?.[y] === 9 || points[x][y]) return 0

    points[x][y] = true
    return (
      1 +
      calculateBasin(x - 1, y) +
      calculateBasin(x, y + 1) +
      calculateBasin(x + 1, y) +
      calculateBasin(x, y - 1)
    )
  }

  return [...lowPoints.map((x) => calculateBasin(...x))]
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, x) => x * a)
}
console.log(`[Part #2]: ${part2()}`)
