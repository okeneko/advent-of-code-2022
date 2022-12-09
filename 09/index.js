const fs = require('fs')
const input = fs
  .readFileSync(`${__dirname}/input.txt`, 'utf8')
  .split('\n')
  .map((x) => [x.split(' ')[0], Number(x.split(' ')[1])])

const part1 = () => {
  const x = 1 // horizontal
  const y = 0 // vertical
  let head = [0, 0]
  let tail = [0, 0]
  let positions = []
  positions.push([...tail])

  input.forEach(([to, steps]) => {
    for (let i = 0; i < steps; i++) {
      switch (to) {
        case 'R':
          head[x]++
          if (Math.abs(head[x] - tail[x]) > 1) {
            tail[x]++
            if (head[y] !== tail[y]) tail[y] = head[y]
          }
          break
        case 'U':
          head[y]++
          if (Math.abs(head[y] - tail[y]) > 1) {
            tail[y]++
            if (head[x] !== tail[x]) tail[x] = head[x]
          }
          break
        case 'L':
          head[x]--
          if (Math.abs(head[x] - tail[x]) > 1) {
            tail[x]--
            if (head[y] !== tail[y]) tail[y] = head[y]
          }
          break
        case 'D':
          head[y]--
          if (Math.abs(head[y] - tail[y]) > 1) {
            tail[y]--
            if (head[x] !== tail[x]) tail[x] = head[x]
          }
          break
      }

      if (!positions.find(([x, y]) => x === tail[0] && y === tail[1])) positions.push([...tail])
    }
  })

  return positions.length
}
console.log(`[Part #1]: ${part1()}`) // 5883

const part2 = () => {
  const x = 1 // horizontal
  const y = 0 // vertical
  let knots = [...Array(10)].map((_) => [0, 0])
  let head = knots[0]
  let tail = knots[9]
  let positions = []
  positions.push([...tail])

  input.forEach(([to, steps]) => {
    for (let i = 0; i < steps; i++) {
      switch (to) {
        case 'R':
          head[x]++
          break
        case 'U':
          head[y]++
          break
        case 'L':
          head[x]--
          break
        case 'D':
          head[y]--
          break
      }

      knots.forEach((knot, j) => {
        if (j === 0) return
        const prev = knots[j - 1]
        if (prev[x] - knot[x] > 1) {
          knot[x]++
          if (prev[y] > knot[y]) knot[y]++
          else if (prev[y] < knot[y]) knot[y]--
        }
        if (prev[x] - knot[x] < -1) {
          knot[x]--
          if (prev[y] > knot[y]) knot[y]++
          else if (prev[y] < knot[y]) knot[y]--
        }
        if (prev[y] - knot[y] > 1) {
          knot[y]++
          if (prev[x] > knot[x]) knot[x]++
          else if (prev[x] < knot[x]) knot[x]--
        }
        if (prev[y] - knot[y] < -1) {
          knot[y]--
          if (prev[x] > knot[x]) knot[x]++
          else if (prev[x] < knot[x]) knot[x]--
        }
      })

      if (!positions.find(([x, y]) => x === tail[0] && y === tail[1])) positions.push([...tail])
    }
  })

  return positions.length
}
console.log(`[Part #2]: ${part2()}`) // 2367
