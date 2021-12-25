const fs = require('fs')
const input = fs
  .readFileSync(`${__dirname}/input.txt`, 'utf8')
  .split('\n')
  .map((x) => x.split(''))

const part1 = () => {
  let i = 0
  let changed = 0
  let cucumbers = JSON.parse(JSON.stringify(input))

  do {
    changed = 0
    let east = JSON.parse(JSON.stringify(cucumbers))
    cucumbers.forEach((x, i, a) =>
      x.forEach((y, j, b) => {
        if (y === '>') {
          const next = b[j + 1] ? j + 1 : 0
          if (b[next] === '.') {
            east[i][next] = '>'
            east[i][j] = '.'
            changed++
          }
        }
      })
    )

    let south = JSON.parse(JSON.stringify(east))
    east.forEach((x, i, a) =>
      x.forEach((y, j, b) => {
        if (y === 'v') {
          const next = a[i + 1] ? i + 1 : 0
          if (a[next][j] === '.') {
            south[next][j] = 'v'
            south[i][j] = '.'
            changed++
          }
        }
      })
    )

    cucumbers = JSON.parse(JSON.stringify(south))

    i++
  } while (changed > 0)

  return i
}
console.log(`[Part #1]: ${part1()}`)
