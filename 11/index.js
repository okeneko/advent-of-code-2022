const fs = require('fs')
const input = fs
  .readFileSync(`${__dirname}/input.txt`, 'utf8')
  .split('\n')
  .map((x) => x.split('').map(Number))

// prettier-ignore
const adjacents = (i,j) => [[i-1,j],[i-1,j+1],[i,j+1],[i+1,j+1],[i+1,j],[i+1,j-1],[i,j-1],[i-1,j-1]]

const part1 = () => {
  let grid = JSON.parse(JSON.stringify(input))
  let totalFlashes = 0

  for (let step = 0; step < 100; step++) {
    let stepFlashes = 0

    grid = grid.map((x) => x.map((y) => y + 1))
    if (!grid.some((x) => x.some((y) => y > 9))) continue

    let flashed = grid.reduce((a, x) => a + x.reduce((b, y) => (y > 9 ? b + 1 : b), 0), 0)
    stepFlashes += flashed

    while (flashed > 0) {
      grid = grid.map((x, i, a) =>
        x.map((y, j) => {
          if (y < 10) {
            let newY = y
            adjacents(i, j).forEach(([i, j]) => {
              if (!isNaN(a[i]?.[j]) && a[i][j] === 10) newY++
            })

            return Math.min(newY, 10)
          } else return y + 1
        })
      )
      flashed = grid.reduce((a, x) => a + x.reduce((b, y) => (y === 10 ? b + 1 : b), 0), 0)
      stepFlashes += flashed
    }

    grid = grid.map((x) => x.map((y) => (y > 9 ? 0 : y)))

    totalFlashes += stepFlashes
  }
  return totalFlashes
}
console.log(`[Part #1]: ${part1()}`)

const part2 = () => {
  let grid = JSON.parse(JSON.stringify(input))

  let step = 0
  while (true) {
    step++
    grid = grid.map((x) => x.map((y) => y + 1))
    if (!grid.some((x) => x.some((y) => y > 9))) continue

    let flashed = grid.reduce((a, x) => a + x.reduce((b, y) => (y > 9 ? b + 1 : b), 0), 0)

    while (flashed > 0) {
      grid = grid.map((x, i, a) =>
        x.map((y, j) => {
          if (y < 10) {
            let newY = y
            adjacents(i, j).forEach(([i, j]) => {
              if (!isNaN(a[i]?.[j]) && a[i][j] === 10) newY++
            })

            return Math.min(newY, 10)
          } else return y + 1
        })
      )
      flashed = grid.reduce((a, x) => a + x.reduce((b, y) => (y === 10 ? b + 1 : b), 0), 0)
    }

    grid = grid.map((x) => x.map((y) => (y > 9 ? 0 : y)))

    if (grid.every((x) => x.every((y) => y === 0))) break
  }
  return step
}
console.log(`[Part #2]: ${part2()}`)
