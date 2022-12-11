const fs = require('fs')
const input = fs
  .readFileSync(`${__dirname}/input.txt`, 'utf8')
  .split('\n\n')
  .map((monkey) => {
    const items = monkey
      .match(/Starting items: ((\d+(,\s)?)+)/)[1]
      .split(', ')
      .map(Number)

    let operation = monkey.match(/Operation: new = (.+)/)[1].replace(/old/g, '${old}')
    operation = `\`${operation}\``

    const test = Number(monkey.match(/Test: divisible by (\d+)/)[1])
    const testTrue = Number(monkey.match(/If true: throw to monkey (\d+)/)[1])
    const testFalse = Number(monkey.match(/If false: throw to monkey (\d+)/)[1])

    return { items, operation, test, testTrue, testFalse, inspections: 0 }
  })

const part1 = () => {
  const monkeys = JSON.parse(JSON.stringify(input))

  for (let round = 1; round <= 20; round++) {
    monkeys.forEach(({ items, operation, test, testTrue, testFalse }, monkey) => {
      items.forEach((old) => {
        let item = eval(eval(operation))
        item = Math.floor(item / 3)
        monkeys[monkey].inspections++
        const newMonkey = item % test === 0 ? testTrue : testFalse
        monkeys[newMonkey].items.push(item)
      })
      monkeys[monkey].items = []
    })
  }

  const [a, b, _] = monkeys
    .map((x) => x.inspections)
    .sort((a, b) => a - b)
    .reverse()
  return a * b
}
console.log(`[Part #1]: ${part1()}`) // 57348

const part2 = () => {
  const monkeys = JSON.parse(JSON.stringify(input))
  const modulo = monkeys.map((x) => x.test).reduce((sum, test) => sum * test, 1)

  for (let round = 1; round <= 10000; round++) {
    monkeys.forEach(({ items, operation, test, testTrue, testFalse }, monkey) => {
      items.forEach((old) => {
        let item = eval(eval(operation))
        item = item % modulo
        monkeys[monkey].inspections++
        const newMonkey = item % test === 0 ? testTrue : testFalse
        monkeys[newMonkey].items.push(item)
      })
      monkeys[monkey].items = []
    })
  }

  const [a, b, _] = monkeys
    .map((x) => x.inspections)
    .sort((a, b) => a - b)
    .reverse()

  return a * b
}
console.log(`[Part #2]: ${part2()}`) // 14106266886
