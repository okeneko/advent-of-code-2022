const fs = require('fs')
let input = fs.readFileSync(`${__dirname}/input.txt`).toString().split(',').map(Number)

const part1 = () => {
  let fish = [...input]
  for (let i = 0; i < 80; i++) {
    let newFish = []
    fish = fish.map((x) => {
      if (x === 0) {
        newFish.push(8)
        return 6
      } else return x - 1
    })
    fish = fish.concat(newFish)
  }
  return fish.length
}
console.log(`[Part #1]: ${part1()}`)

const part2 = () => {
  let days = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  let fishCount = input.length

  input.forEach((x) => days[x]++)

  for (let i = 0; i < 256; i++) {
    let newBorns = days[0]
    days = days.map((_, i, a) => a[i + 1] ?? 0)
    days[8] = newBorns
    days[6] += newBorns
    fishCount += newBorns
  }
  return fishCount
}
console.log(`[Part #2]: ${part2()}`)
