const fs = require('fs')
const input = fs
  .readFileSync(`${__dirname}/input.txt`, 'utf8')
  .split('\n')
  .map((row) => row.split(''))

let start = [0, 0]
let end = [0, 0]
input.forEach((row, i) => {
  if (row.indexOf('S') >= 0) start = [i, row.indexOf('S')]
  if (row.indexOf('E') >= 0) end = [i, row.indexOf('E')]
})

const part1 = () => {
  const [startRow, startCol, endRow, endCol] = [...start, ...end]
  let grid = JSON.parse(JSON.stringify(input))
  grid[startRow][startCol] = 'a'
  grid[endRow][endCol] = 'z'

  let explored = []
  let queue = []
  explored.push(start)
  queue.push(start)
  let distances = []
  distances[start] = 0

  while (queue.length > 0) {
    const [row, col] = queue.shift()
    if (row === endRow && col === endCol) break

    let nextSteps = []
    // top
    if (
      !explored.find(([x, y]) => x === row - 1 && y === col) &&
      grid[row - 1] &&
      grid[row - 1][col].charCodeAt(0) <= grid[row][col].charCodeAt(0) + 1
    )
      nextSteps.push([row - 1, col])
    // right
    if (
      !explored.find(([x, y]) => x === row && y === col + 1) &&
      grid[row][col + 1] &&
      grid[row][col + 1].charCodeAt(0) <= grid[row][col].charCodeAt(0) + 1
    )
      nextSteps.push([row, col + 1])
    // bottom
    if (
      !explored.find(([x, y]) => x === row + 1 && y === col) &&
      grid[row + 1] &&
      grid[row + 1][col].charCodeAt(0) <= grid[row][col].charCodeAt(0) + 1
    )
      nextSteps.push([row + 1, col])
    // left
    if (
      !explored.find(([x, y]) => x === row && y === col - 1) &&
      grid[row][col - 1] &&
      grid[row][col - 1].charCodeAt(0) <= grid[row][col].charCodeAt(0) + 1
    )
      nextSteps.push([row, col - 1])

    nextSteps.forEach(([nextRow, nextCol]) => {
      explored.push([nextRow, nextCol])
      queue.push([nextRow, nextCol])
      distances[[nextRow, nextCol]] = distances[[row, col]] + 1
    })
  }

  return distances[end]
}
console.log(`[Part #1]: ${part1()}`) // 350

const part2 = () => {
  const [startRow, startCol, endRow, endCol] = [...start, ...end]
  let grid = JSON.parse(JSON.stringify(input))
  grid[startRow][startCol] = 'a'
  grid[endRow][endCol] = 'z'

  let paths = []

  grid.forEach((x, i) => {
    x.forEach((square, j) => {
      if (square !== 'a') return

      let explored = []
      let queue = []
      explored.push([i, j])
      queue.push([i, j])
      let distances = []
      distances[[i, j]] = 0

      while (queue.length > 0) {
        const [row, col] = queue.shift()
        if (row === endRow && col === endCol) break

        let nextSteps = []
        // top
        if (
          !explored.find(([x, y]) => x === row - 1 && y === col) &&
          grid[row - 1] &&
          grid[row - 1][col].charCodeAt(0) <= grid[row][col].charCodeAt(0) + 1
        )
          nextSteps.push([row - 1, col])
        // right
        if (
          !explored.find(([x, y]) => x === row && y === col + 1) &&
          grid[row][col + 1] &&
          grid[row][col + 1].charCodeAt(0) <= grid[row][col].charCodeAt(0) + 1
        )
          nextSteps.push([row, col + 1])
        // bottom
        if (
          !explored.find(([x, y]) => x === row + 1 && y === col) &&
          grid[row + 1] &&
          grid[row + 1][col].charCodeAt(0) <= grid[row][col].charCodeAt(0) + 1
        )
          nextSteps.push([row + 1, col])
        // left
        if (
          !explored.find(([x, y]) => x === row && y === col - 1) &&
          grid[row][col - 1] &&
          grid[row][col - 1].charCodeAt(0) <= grid[row][col].charCodeAt(0) + 1
        )
          nextSteps.push([row, col - 1])

        nextSteps.forEach(([nextRow, nextCol]) => {
          explored.push([nextRow, nextCol])
          queue.push([nextRow, nextCol])
          distances[[nextRow, nextCol]] = distances[[row, col]] + 1
        })
      }

      paths.push(distances[end])
    })
  })

  return Math.min(...paths.filter((x) => !!x)) // 349
}
console.log(`[Part #2]: ${part2()}`)
