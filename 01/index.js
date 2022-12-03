const fs = require('fs')
const input = fs
  .readFileSync(`${__dirname}/input.txt`, 'utf8')
  .split('\n\n')
  .map((x) => x.split('\n').map(Number))

const part1 = () => {
  const sums = input.map((x) => x.reduce((a, b) => a + b), 0)
  return Math.max(...sums)
}
console.log(`[Part #1]: ${part1()}`) // 69501

const part2 = () => {
  const sums = input.map((x) => x.reduce((a, b) => a + b), 0)
  const sorted = [...sums].sort((a, b) => a - b)
  const top3 = [...sorted].reverse().slice(0, 3)
  return top3.reduce((a, b) => a + b, 0)
}
console.log(`[Part #2]: ${part2()}`) // 202346
