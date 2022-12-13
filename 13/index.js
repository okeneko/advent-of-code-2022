const fs = require('fs')
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8')

const comparePairs = (left, right) => {
  if (!Array.isArray(left) && !Array.isArray(right)) {
    if (left < right) return 1
    else if (left > right) return -1
    else return 0
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    let i = 0
    while (true) {
      if (i >= left.length && i >= right.length) return 0
      if (i >= left.length) return 1
      if (i >= right.length) return -1
      let compared = comparePairs(left[i], right[i])
      if (compared !== 0) return compared
      i++
    }
  }

  if (Array.isArray(left) && !Array.isArray(right)) return comparePairs(left, [right])
  if (!Array.isArray(left) && Array.isArray(right)) return comparePairs([left], right)
}

const part1 = () => {
  const pairs = input
    .split('\n\n')
    .map((pair) => pair.split('\n').map((packet) => JSON.parse(packet)))

  return pairs.reduce(
    (sum, [left, right], i) => (comparePairs(left, right) > 0 ? sum + i + 1 : sum),
    0
  )
}
console.log(`[Part #1]: ${part1()}`) // 5393

const part2 = () => {
  const dividers = [[[2]], [[6]]]
  const packets = [
    ...input
      .split('\n')
      .filter((x) => x !== '')
      .map((packet) => JSON.parse(packet)),
    ...dividers,
  ]

  let sortedPackets = [...packets].sort(comparePairs).reverse()
  return sortedPackets.reduce(
    (decoderKey, packet, i) =>
      dividers.map((x) => JSON.stringify(x)).find((x) => x === JSON.stringify(packet))
        ? decoderKey * (i + 1)
        : decoderKey,
    1
  )
}
console.log(`[Part #2]: ${part2()}`) // 26712
