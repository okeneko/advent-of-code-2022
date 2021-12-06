const fs = require('fs')
let input = fs
  .readFileSync(`${__dirname}/input.txt`)
  .toString()
  .split('\n')
  .map((x) => [x.split(' ')[0], parseInt(x.split(' ')[1])])

const part1 = () => {
  const [x, y] = input.reduce(
    ([x, y], v) => {
      let [command, value] = v
      switch (command) {
        case 'forward':
          return [x + value, y]
        case 'down':
          return [x, y + value]
        case 'up':
          return [x, y - value]
      }
    },
    [0, 0]
  )
  return x * y
}
console.log(`[Part #1]: ${part1()}`)

const part2 = () => {
  const [x, y] = input.reduce(
    ([x, y, aim], v) => {
      let [command, value] = v
      switch (command) {
        case 'forward':
          return [x + value, y + aim * value, aim]
        case 'down':
          return [x, y, aim + value]
        case 'up':
          return [x, y, aim - value]
      }
    },
    [0, 0, 0]
  )
  return x * y
}
console.log(`[Part #2]: ${part2()}`)
