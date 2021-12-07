const fs = require('fs')
let input = fs.readFileSync(`${__dirname}/input.txt`).toString().split('\n\n')
const draw = input[0].split(',').map(Number)
const boards = input.slice(1).map((x) => {
  return x.split('\n').map((y) =>
    y
      .split(' ')
      .filter((z) => z !== '')
      .map((z) => [Number(z), false])
  )
})

const part1 = () => {
  let game = JSON.parse(JSON.stringify(boards))
  let broken = false
  let score = 0

  for (let d = 0; d < draw.length; d++) {
    const number = draw[d]
    for (let a = 0; a < game.length; a++) {
      // board
      if (broken) break
      const board = game[a]
      for (let b = 0; b < board.length; b++) {
        // row
        if (broken) break
        const row = board[b]
        for (let c = 0; c < row.length; c++) {
          // cell
          const cell = game[a][b][c]
          if (cell[0] === number) game[a][b][c] = [cell[0], true]
        }

        const tBoard = board[0].map((_, i) => board.map((row) => row[i]))
        if (board.some((x) => x.every((y) => y[1])) || tBoard.some((x) => x.every((y) => y[1]))) {
          const unmarked = board.reduce(
            (acc, val) => acc + val.reduce((acc, val) => (!val[1] ? acc + val[0] : acc), 0),
            0
          )
          score = unmarked * number

          broken = true
          break
        }
      }
    }
  }

  return score
}
console.log(`[Part #1]: ${part1()}`)

const part2 = () => {
  let game = JSON.parse(JSON.stringify(boards))
  let wonBoards = []
  let broken = false
  let score = 0

  for (let d = 0; d < draw.length; d++) {
    const number = draw[d]
    for (let a = 0; a < game.length; a++) {
      // board
      if (broken) break
      const board = game[a]
      for (let b = 0; b < board.length; b++) {
        // row
        if (broken) break
        const row = board[b]
        for (let c = 0; c < row.length; c++) {
          // cell
          const cell = game[a][b][c]
          if (cell[0] === number) game[a][b][c] = [cell[0], true]
        }

        const tBoard = board[0].map((_, i) => board.map((row) => row[i]))
        if (board.some((x) => x.every((y) => y[1])) || tBoard.some((x) => x.every((y) => y[1]))) {
          if (!wonBoards.includes(a)) wonBoards.push(a)
          if (wonBoards.length === game.length) {
            // last won board
            const unmarked = board.reduce(
              (acc, val) => acc + val.reduce((acc, val) => (!val[1] ? acc + val[0] : acc), 0),
              0
            )
            score = unmarked * number

            broken = true
            break
          }
        }
      }
    }
  }

  return score
}
console.log(`[Part #2]: ${part2()}`)
