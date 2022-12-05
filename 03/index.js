const fs = require('fs')
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n')

let priorities = [...'abcdefghijklmnopqrstuvwxyz']
priorities = [...priorities, ...priorities.map((x) => x.toUpperCase())]

const part1 = () => {
  const rucksacks = input.map((x) => [
    x.slice(0, x.length / 2).split(''),
    x.slice(x.length / 2, x.length).split(''),
  ])
  const commonItems = rucksacks.reduce(
    (items, item) => [...items, item[0].filter((x) => item[1].includes(x))[0]],
    []
  )
  return commonItems.reduce((sum, item) => sum + priorities.indexOf(item) + 1, 0)
}
console.log(`[Part #1]: ${part1()}`) // 7785

const part2 = () => {
  let prioritySum = 0
  for (let i = 0; i < input.length; i += 3) {
    const [a, b, c] = [input[i].split(''), input[i + 1].split(''), input[i + 2].split('')]
    const commonItem = a.filter((x) => b.includes(x)).filter((x) => c.includes(x))[0]
    prioritySum += priorities.indexOf(commonItem) + 1
  }
  return prioritySum
}
console.log(`[Part #2]: ${part2()}`) // 2633
