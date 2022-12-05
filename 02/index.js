const fs = require('fs')
const input = fs
  .readFileSync(`${__dirname}/input.txt`, 'utf8')
  .split('\n')
  .map((x) => x.split(' '))

const play = (opponent, player) => {
  // opponent wins, player loses
  if (
    (opponent === 'A' && player === 'Z') ||
    (opponent === 'B' && player === 'X') ||
    (opponent === 'C' && player === 'Y')
  )
    return -1
  // opponent loses, player wins
  if (
    (opponent === 'A' && player === 'Y') ||
    (opponent === 'B' && player === 'Z') ||
    (opponent === 'C' && player === 'X')
  )
    return 1
  // draw
  return 0
}

const part1 = () => {
  return input.reduce((score, round) => {
    let roundScore = 0
    const [opponent, player] = round
    const result = play(opponent, player)
    if (player === 'X') roundScore += 1
    if (player === 'Y') roundScore += 2
    if (player === 'Z') roundScore += 3
    if (result > 0) roundScore += 6
    if (result === 0) roundScore += 3
    return score + roundScore
  }, 0)
}
console.log(`[Part #1]: ${part1()}`) // 12276

const calculateShape = (opponent, end) => {
  // player loses
  if (end === 'X') {
    if (opponent === 'A') return 'C'
    if (opponent === 'B') return 'A'
    if (opponent === 'C') return 'B'
  }

  // draw
  if (end === 'Y') return opponent

  // player wins
  if (end === 'Z') {
    if (opponent === 'A') return 'B'
    if (opponent === 'B') return 'C'
    if (opponent === 'C') return 'A'
  }
}

const part2 = () => {
  return input.reduce((score, round) => {
    let roundScore = 0
    const [opponent, end] = round
    const player = calculateShape(opponent, end)
    if (player === 'A') roundScore += 1
    if (player === 'B') roundScore += 2
    if (player === 'C') roundScore += 3
    if (end === 'Z') roundScore += 6
    if (end === 'Y') roundScore += 3
    return score + roundScore
  }, 0)
}
console.log(`[Part #2]: ${part2()}`) // 9975
