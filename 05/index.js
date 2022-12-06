const fs = require('fs')
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n\n')
let stacks = input[0]
  .split('\n')
  .slice(0, -1)
  .map((x) =>
    x
      .replace(/(\s)?\s\s\s(\s)??/g, '$1#$2')
      .replace(/\s|\]|\[/g, '')
      .split('')
      .map((x) => (x === '#' ? '' : x))
  )
stacks = stacks[0].map((_, i) => stacks.map((x) => x[i]).filter(Boolean))

const procedure = input[1].split('\n').map((x) => x.split(' ').filter(Number))

const part1 = () => {
  let state = JSON.parse(JSON.stringify(stacks))

  procedure.forEach(([move, from, to]) => {
    for (let i = 0; i < move; i++) {
      state[to - 1].unshift(state[from - 1].shift())
    }
  })

  return state.reduce((result, stack) => result + stack[0], '')
}
console.log(`[Part #1]: ${part1()}`) // QMBMJDFTD

const part2 = () => {
  let state = JSON.parse(JSON.stringify(stacks))

  procedure.forEach(([move, from, to]) => {
    let crates = []
    for (let i = 0; i < move; i++) {
      crates.push(state[from - 1].shift())
    }
    state[to - 1].unshift(...crates)
  })

  return state.reduce((result, stack) => result + stack[0], '')
}
console.log(`[Part #2]: ${part2()}`) // NBTVTJNFJ
