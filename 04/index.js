const fs = require('fs')
const input = fs
  .readFileSync(`${__dirname}/input.txt`, 'utf8')
  .split('\n')
  .map((x) => x.split(',').map((y) => y.split('-').map(Number)))

const part1 = () =>
  input.reduce((result, pair) => {
    const [[aFrom, aTo], [bFrom, bTo]] = pair
    if ((aFrom <= bFrom && bTo <= aTo) || (bFrom <= aFrom && aTo <= bTo)) return result + 1
    return result
  }, 0)
console.log(`[Part #1]: ${part1()}`) // 573

const part2 = () =>
  input.reduce((result, pair) => {
    const [[aFrom, aTo], [bFrom, bTo]] = pair
    if (
      (aFrom >= bFrom && aFrom <= bTo) ||
      (aTo >= bFrom && aTo <= bTo) ||
      (bFrom >= aFrom && bFrom <= aTo) ||
      (bTo >= aFrom && bTo <= aTo)
    )
      return result + 1
    return result
  }, 0)
console.log(`[Part #2]: ${part2()}`) // 867
