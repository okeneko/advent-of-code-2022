const fs = require('fs')
let input = fs.readFileSync(`${__dirname}/test-input.txt`).toString().split(',').map(Number)

const part1 = () => {
  let tries = []
  for (let i = Math.min(...input); i <= Math.max(...input); i++) {
    tries[i] = input.map((x) => Math.abs(x - i)).reduce((a, v) => a + v, 0)
  }
  return Math.min(...tries)
}
console.log(`[Part #1]: ${part1()}`)

const part2 = () => {
  let tries = []
  for (let i = Math.min(...input); i <= Math.max(...input); i++) {
    tries[i] = input
      .map((x) => {
        const max = Math.abs(x - i)
        return Array.from({ length: max }, (_, i) => i + 1).reduce((a, v) => a + v, 0)
      })
      .reduce((a, v) => a + v, 0)
  }
  return Math.min(...tries)
}
console.log(`[Part #2]: ${part2()}`)
