const fs = require('fs')
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('')

const part1 = () => {
  let i = 0
  while (i < input.length) {
    if (!input[i - 3] || !input[i - 2] || !input[i - 1]) {
      i++
      continue
    }

    const four = [input[i - 3], input[i - 2], input[i - 1], input[i]]
    if ([...new Set(four)].length === 4) break

    i++
  }

  return i + 1
}
console.log(`[Part #1]: ${part1()}`) // 1542

const part2 = () => {
  let i = 0
  while (i < input.length) {
    if (!input[i - 13]) {
      i++
      continue
    }

    let fourteen = []
    for (let j = 0; j < 14; j++) {
      fourteen.unshift(input[i - j])
    }

    if ([...new Set(fourteen)].length === 14) break

    i++
  }

  return i + 1
}
console.log(`[Part #2]: ${part2()}`) // 3153
