const fs = require('fs')
let input = fs
  .readFileSync(`${__dirname}/input.txt`)
  .toString()
  .split('\n')
  .map((x) => x.split(' -> ').map((y) => y.split(',').map(Number)))

const part1 = () => {
  const max = Math.max(...input.flatMap((x) => x.flat())) + 1
  let vents = [...Array(max)].map((_) => Array(max).fill(0))

  input.forEach(([[x1, y1], [x2, y2]]) => {
    if (x1 === x2) {
      for (let i = Math.min(y1, y2); i <= Math.max(y1, y2); i++) {
        vents[x1][i]++
      }
    }

    if (y1 === y2) {
      for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) {
        vents[i][y1]++
      }
    }
  })

  return vents.flatMap((x) => x.flat()).filter((y) => y > 1).length
}
console.log(`[Part #1]: ${part1()}`)

const part2 = () => {
  const max = Math.max(...input.flatMap((x) => x.flat())) + 1
  let vents = [...Array(max)].map((_) => Array(max).fill(0))

  input.forEach(([[x1, y1], [x2, y2]]) => {
    if (x1 === x2) {
      for (let i = Math.min(y1, y2); i <= Math.max(y1, y2); i++) {
        vents[x1][i]++
      }
    } else if (y1 === y2) {
      for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) {
        vents[i][y1]++
      }
    } else {
      let coords = [...Array(Math.max(x1, x2) - Math.min(x1, x2) + 1)].map(
        (_) => [0, 0]
      )
      let index = 0
      if (x1 < x2) {
        for (let i = x1; i <= x2; i++) {
          coords[index][0] = i
          index++
        }
      } else {
        for (let i = x1; i >= x2; i--) {
          coords[index][0] = i
          index++
        }
      }

      index = 0
      if (y1 < y2) {
        for (let i = y1; i <= y2; i++) {
          coords[index][1] = i
          index++
        }
      } else {
        for (let i = y1; i >= y2; i--) {
          coords[index][1] = i
          index++
        }
      }

      coords.forEach(([x, y]) => vents[x][y]++)
    }
  })

  return vents.flatMap((x) => x.flat()).filter((y) => y > 1).length
}
console.log(`[Part #2]: ${part2()}`)
