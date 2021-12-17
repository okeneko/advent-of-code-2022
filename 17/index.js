// prettier-ignore
// target area: x=209..238, y=-86..-59
const input = [[209,238],[-86,-59]]

const isInTrench = (x, y) =>
  x >= input[0][0] && x <= input[0][1] && y >= input[1][0] && y <= input[1][1]

const part1 = () => {
  const maxX = Math.max(...input[0])
  const maxY = Math.min(...input[1])
  let yPositions = []

  let i = 1
  while (i <= 1000) {
    let j = 1
    while (j <= 1000) {
      let x = 0
      let y = 0
      let vx = i
      let vy = j
      let positions = []
      while (!isInTrench(x, y) && x <= maxX && y >= maxY) {
        positions.push(y)
        x += vx
        y += vy

        if (vx > 0) vx--
        if (vx < 0) vx++

        vy--
      }
      if (isInTrench(x, y)) yPositions.push(Math.max(...positions))
      j++
    }
    i++
  }

  return Math.max(...yPositions)
}
console.log(`[Part #1]: ${part1()}`)

const part2 = () => {
  const maxX = Math.max(...input[0])
  const maxY = Math.min(...input[1])
  let velocities = 0

  let i = -1000
  while (i <= 1000) {
    let j = -1000
    while (j <= 1000) {
      let x = 0
      let y = 0
      let vx = i
      let vy = j
      while (!isInTrench(x, y) && x <= maxX && y >= maxY) {
        x += vx
        y += vy

        if (vx > 0) vx--
        if (vx < 0) vx++

        vy--
      }
      if (isInTrench(x, y)) velocities++
      j++
    }
    i++
  }

  return velocities
}
console.log(`[Part #2]: ${part2()}`)
