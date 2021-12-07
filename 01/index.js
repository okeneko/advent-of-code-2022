const fs = require('fs')
let input = fs.readFileSync(`${__dirname}/input.txt`).toString().split('\n').map(Number)

const part1 = () => {
  return input.reduce(
    (prev, v, i, arr) => (arr[i - 1] ? (v > arr[i - 1] ? prev + 1 : prev) : prev),
    0
  )
}
console.log(`[Part #1]: ${part1()}`)

const part2 = () => {
  return input.reduce((prev, v, i, arr) => {
    if (!arr[i - 1] || !arr[i + 2]) return prev

    const sumA = arr[i - 1] + v + arr[i + 1]
    const sumB = v + arr[i + 1] + arr[i + 2]
    return sumB > sumA ? prev + 1 : prev
  }, 0)
}
console.log(`[Part #2]: ${part2()}`)
