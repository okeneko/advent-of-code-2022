const fs = require('fs')
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n')

const isOpener = (x) => '([{<'.includes(x)
const opposite = { '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{', '<': '>', '>': '<' }

const part1 = () => {
  const illegalChars = input.flatMap((line) => {
    let stack = []
    let result = []

    for (const a of line) {
      if (stack.length === 0 || isOpener(a)) {
        stack.push(a)
        continue
      }

      if (opposite[a] === stack[stack.length - 1]) stack.pop()
      else {
        result.push(a)
        break
      }
    }

    return result
  })

  const points = { ')': 3, ']': 57, '}': 1197, '>': 25137 }

  return illegalChars.reduce((a, x) => a + points[x], 0)
}
console.log(`[Part #1]: ${part1()}`)

const part2 = () => {
  const closingChars = input
    .map((line) => {
      let stack = []

      for (const a of line) {
        if (stack.length === 0 || isOpener(a)) {
          stack.push(a)
          continue
        }

        if (opposite[a] === stack[stack.length - 1]) stack.pop()
        else return [] // illegal
      }

      return stack.map((x) => opposite[x]).reverse()
    })
    .filter((x) => x.length > 0)

  const points = { ')': 1, ']': 2, '}': 3, '>': 4 }

  const scores = closingChars.map((x) => x.reduce((a, x) => 5 * a + points[x], 0))

  return scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)]
}
console.log(`[Part #2]: ${part2()}`)
