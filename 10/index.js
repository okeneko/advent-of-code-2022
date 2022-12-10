const fs = require('fs')
const input = fs
  .readFileSync(`${__dirname}/input.txt`, 'utf8')
  .split('\n')
  .map((x) => x.split(' ').map((y) => (!isNaN(y) ? Number(y) : y)))

const part1 = () => {
  let cycle = 1
  let pointer = 0
  let x = 1
  let addxCycle = false
  let signalStrenghts = []

  while (cycle <= 220) {
    if (cycle % 40 === 20) signalStrenghts.push(cycle * x)

    const [command, value] = input[pointer]
    if (command === 'noop') {
      cycle++
      pointer++
      continue
    }
    if (command === 'addx') {
      if (!addxCycle) {
        cycle++
        addxCycle = true
        continue
      }

      x += value
      cycle++
      pointer++
      addxCycle = false
    }
  }

  return signalStrenghts.reduce((sum, strength) => sum + strength, 0)
}
console.log(`[Part #1]: ${part1()}`) //  13440

const part2 = () => {
  let screen = [...Array(240).fill(false)]
  let pointer = 0
  let x = 1
  let addxCycle = false

  screen = screen.map((_, position) => {
    let pixel = false

    if (position % 40 === x - 1 || position % 40 === x || position % 40 === x + 1) pixel = true

    const [command, value] = input[pointer]
    if (command === 'noop') {
      pointer++
      return pixel
    }
    if (command === 'addx') {
      if (!addxCycle) {
        addxCycle = true
        return pixel
      }

      x += value
      pointer++
      addxCycle = false
    }

    return pixel
  })

  screen.forEach((pixel, i) => {
    process.stdout.write(pixel ? '█' : ' ')
    if ((i + 1) % 40 === 0) process.stdout.write('\n')
  })
}
console.log(`[Part #2]:`)
part2() // PBZGRAZA
