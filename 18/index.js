const fs = require('fs')
const input = fs
  .readFileSync(`${__dirname}/input.txt`, 'utf8')
  .split('\n')
  .map((x) => x.split(',').map(Number))

const getAdjacents = (x, y, z) => [
  [x + 1, y, z],
  [x - 1, y, z],
  [x, y + 1, z],
  [x, y - 1, z],
  [x, y, z + 1],
  [x, y, z - 1],
]

const part1 = () => {
  return input.reduce((sum, [x, y, z]) => {
    let sides = 0
    getAdjacents(x, y, z).forEach(([x, y, z]) => {
      if (!input.find(([a, b, c]) => x === a && y === b && z === c)) sides++
    })
    return sum + sides
  }, 0)
}
console.log(`[Part #1]: ${part1()}`) // 3522

const part2 = () => {
  const maxX = Math.max(...input.map(([x, y, z]) => x)) + 1
  const minX = Math.min(...input.map(([x, y, z]) => x)) - 1
  const maxY = Math.max(...input.map(([x, y, z]) => y)) + 1
  const minY = Math.min(...input.map(([x, y, z]) => y)) - 1
  const maxZ = Math.max(...input.map(([x, y, z]) => z)) + 1
  const minZ = Math.min(...input.map(([x, y, z]) => z)) - 1

  const outOfBounds = (x, y, z) =>
    x > maxX || x < minX || y > maxY || y < minY || z > maxZ || z < minZ

  let explored = []
  let queue = []
  explored.push([minX, minY, minZ])
  queue.push([minX, minY, minZ])
  let sides = 0

  while (queue.length > 0) {
    const [x, y, z] = queue.shift()
    getAdjacents(x, y, z).forEach(([i, j, k]) => {
      if (outOfBounds(i, j, k)) return
      if (explored.find(([a, b, c]) => i === a && j === b && k === c)) return
      if (input.find(([a, b, c]) => i === a && j === b && k === c)) {
        sides++
        return
      }
      explored.push([i, j, k])
      queue.push([i, j, k])
    })
  }

  return sides
}
console.log(`[Part #2]: ${part2()}`) // 2074
