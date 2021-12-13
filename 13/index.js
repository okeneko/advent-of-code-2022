const fs = require('fs')
let [coordinates, folds] = fs
  .readFileSync(`${__dirname}/input.txt`, 'utf8')
  .split('\n\n')
  .map((x) => x.split('\n'))
coordinates = coordinates.map((x) => x.split(',').map(Number))
folds = folds.map((x) => [x.split('=')[0].slice(-1), Number(x.split('=')[1])])

const maxX = Math.max(...coordinates.map((x) => x[0]))
const maxY = Math.max(...coordinates.map((x) => x[1]))
let inputDots = [...Array(maxX + 1)].map((_) => Array(maxY + 1).fill(false))
coordinates.forEach(([x, y]) => (inputDots[x][y] = true))

const printDots = (dots) => {
  // transpose the matrix so arrays are displayed vertically
  const transDots = dots[0].map((_, i) => dots.map((x) => (x[i] === false ? ' ' : '█')))
  console.log(transDots.map((x) => x.join('')).join('\n'))
}

const part1 = () => {
  let dots = JSON.parse(JSON.stringify(inputDots))
  const [axis, line] = folds[0]
  if (axis === 'y') {
    dots = dots.map((x) => {
      let newLine = []
      let i = line - 1
      let j = line + 1
      while (i >= 0) {
        newLine.push(x[i] || x[j])
        i--
        j++
      }
      return newLine.reverse()
    })
  }

  if (axis === 'x') {
    dots[0].forEach((_, y) => {
      let i = line - 1
      let j = line + 1
      while (i >= 0) {
        dots[i][y] = dots[i]?.[y] || dots[j]?.[y]
        i--
        j++
      }
    })
    dots = dots.filter((_, i) => i < line)
  }

  return [...dots].flat().reduce((a, x) => (x ? a + 1 : a), 0)
}
console.log(`[Part #1]: ${part1()}`)

const part2 = () => {
  let dots = JSON.parse(JSON.stringify(inputDots))
  folds.forEach(([axis, line]) => {
    if (axis === 'y') {
      dots = dots.map((x) => {
        let newLine = []
        let i = line - 1
        let j = line + 1
        while (i >= 0) {
          newLine.push(x[i] || x[j])
          i--
          j++
        }
        return newLine.reverse()
      })
    }

    if (axis === 'x') {
      dots[0].forEach((_, y) => {
        let i = line - 1
        let j = line + 1
        while (i >= 0) {
          dots[i][y] = dots[i]?.[y] || dots[j]?.[y]
          i--
          j++
        }
      })
      dots = dots.filter((_, i) => i < line)
    }
  })

  return dots
}
console.log(`[Part #2]:`)
printDots(part2())
