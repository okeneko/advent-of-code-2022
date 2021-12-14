const fs = require('fs')
let [template, rules] = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n\n')
template = template.split('')
rules = rules.split('\n').reduce((a, x) => ({ ...a, [x.split(' -> ')[0]]: x.split(' -> ')[1] }), {})

const part1 = () => {
  let polymers = [...template]
  for (let i = 0; i < 10; i++) {
    polymers = polymers.reduce(
      (a, x, i, p) => (p[i + 1] ? [...a, x, rules[`${x}${p[i + 1]}`]] : [...a, x]),
      []
    )
  }

  const occurrences = polymers.reduce((a, x) => ({ ...a, [x]: a[x] ? a[x] + 1 : 1 }), {})
  return Math.max(...Object.values(occurrences)) - Math.min(...Object.values(occurrences))
}
console.log(`[Part #1]: ${part1()}`)

const part2 = () => {
  let polymers = [...template]
  let elCount = [...new Set(polymers)].reduce(
    (a, x) => ({ ...a, [x]: polymers.filter((y) => y === x).length }),
    {}
  )
  let polyCount = Object.keys(rules).reduce((a, x) => ({ ...a, [x]: 0 }), {})

  polymers.forEach((x, i, p) => {
    if (p[i + 1]) polyCount[`${x}${p[i + 1]}`]++
  })

  for (let i = 0; i < 40; i++) {
    for (const [x, v] of Object.entries(polyCount)) {
      if (v > 0) {
        polyCount[x] -= v
        const [x1, x2] = x.split('')
        const newP = rules[x]
        elCount[newP] = elCount[newP] ? elCount[newP] + v : v
        polyCount[`${x1}${newP}`] += v
        polyCount[`${newP}${x2}`] += v
      }
    }
  }

  return Math.max(...Object.values(elCount)) - Math.min(...Object.values(elCount))
}
console.log(`[Part #2]: ${part2()}`)
