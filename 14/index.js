const fs = require('fs')
const input = fs
  .readFileSync(`${__dirname}/input.txt`, 'utf8')
  .split('\n')
  .map((line) => line.split(' -> ').map((point) => point.split(',').map(Number)))
const start = [500, 0]

let inputCave = { [start]: 'x' }
input.forEach((line) => {
  line.forEach(([fromX, fromY], index) => {
    if (index + 1 === line.length) return
    const [toX, toY] = line[index + 1]

    // vertical
    if (fromX === toX && fromY !== toY) {
      let inLine = toX
      let from = fromY
      let to = toY
      let i = from

      // to the bottom
      if (from < to) {
        while (i <= to) {
          inputCave[[inLine, i]] = '#'
          i++
        }
      }

      // to the top
      if (from > to) {
        while (i >= to) {
          inputCave[[inLine, i]] = '#'
          i--
        }
      }
    }

    // horizontal
    if (fromX !== toX && fromY === toY) {
      let inLine = toY
      let from = fromX
      let to = toX
      let i = from

      // to the right
      if (from < to) {
        while (i <= to) {
          inputCave[[i, inLine]] = '#'
          i++
        }
      }

      // to the left
      if (from > to) {
        while (i >= to) {
          inputCave[[i, inLine]] = '#'
          i--
        }
      }
    }
  })
})

const part1 = () => {
  let cave = JSON.parse(JSON.stringify(inputCave))
  let maxDepth = Math.max(...Object.keys(cave).map((x) => Number(x.split(',')[1])))

  let abyss = false
  while (!abyss) {
    let [x, y] = start

    while (true) {
      if (y > maxDepth) {
        abyss = true
        break
      }

      if ([x, y + 1] in cave) {
        if ([x - 1, y + 1] in cave) {
          if ([x + 1, y + 1] in cave) {
            cave[[x, y]] = 'o'
            break
          }
          x++
          y++
          continue
        }
        x--
        y++
        continue
      }

      y++
    }
  }

  return Object.values(cave).reduce((sum, x) => (x === 'o' ? sum + 1 : sum), 0)
}
console.log(`[Part #1]: ${part1()}`) // 728

const part2 = () => {
  let cave = JSON.parse(JSON.stringify(inputCave))
  let floor = 2 + Math.max(...Object.keys(cave).map((x) => Number(x.split(',')[1])))

  let end = false
  while (!end) {
    let [x, y] = start

    while (true) {
      if (y + 1 === floor) {
        cave[[x, y]] = 'o'
        break
      }

      if ([x, y + 1] in cave) {
        if ([x - 1, y + 1] in cave) {
          if ([x + 1, y + 1] in cave) {
            cave[[x, y]] = 'o'
            if (x === start[0] && y === start[1]) end = true
            break
          }
          x++
          y++
          continue
        }
        x--
        y++
        continue
      }

      y++
    }
  }

  return Object.values(cave).reduce((sum, x) => (x === 'o' ? sum + 1 : sum), 0)
}
console.log(`[Part #2]: ${part2()}`) // 27623
