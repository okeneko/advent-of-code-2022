const fs = require('fs')
let [algorithm, input] = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n\n')
algorithm = algorithm.split('').map((x) => (x === '#' ? 1 : 0))
input = input.split('\n').map((x) => x.split('').map((y) => (y === '#' ? 1 : 0)))

const runAlgorithm = (image, x, y, infinite = 0) => {
  const square = [
    image[x - 1]?.[y - 1],
    image[x - 1]?.[y],
    image[x - 1]?.[y + 1],
    image[x]?.[y - 1],
    image[x]?.[y],
    image[x]?.[y + 1],
    image[x + 1]?.[y - 1],
    image[x + 1]?.[y],
    image[x + 1]?.[y + 1],
  ].map((x) => (x === undefined ? infinite : x))
  return parseInt(square.join(''), 2)
}

const part1 = () => {
  let image = JSON.parse(JSON.stringify(input))
  let infinitePixel = 0
  for (let i = 0; i < 2; i++) {
    const emptyRow = Array.from({ length: image[0].length + 2 }, (_) => infinitePixel)
    image = [
      [...emptyRow],
      ...image.map((x) => [infinitePixel, ...x, infinitePixel]),
      [...emptyRow],
    ]
    image = image.map((x, i) =>
      x.map((y, j) => algorithm[runAlgorithm(image, i, j, infinitePixel)])
    )
    const infiniteSquare = Array.from({ length: 9 }, (_) => infinitePixel)
    infinitePixel = algorithm[parseInt(infiniteSquare.join(''), 2)]
  }
  return image.flat().reduce((a, x) => (x ? a + 1 : a), 0)
}
console.log(`[Part #1]: ${part1()}`)

const part2 = () => {
  let image = JSON.parse(JSON.stringify(input))
  let infinitePixel = 0
  for (let i = 0; i < 50; i++) {
    const emptyRow = Array.from({ length: image[0].length + 2 }, (_) => infinitePixel)
    image = [
      [...emptyRow],
      ...image.map((x) => [infinitePixel, ...x, infinitePixel]),
      [...emptyRow],
    ]
    image = image.map((x, i) =>
      x.map((y, j) => algorithm[runAlgorithm(image, i, j, infinitePixel)])
    )
    const infiniteSquare = Array.from({ length: 9 }, (_) => infinitePixel)
    infinitePixel = algorithm[parseInt(infiniteSquare.join(''), 2)]
  }
  return image.flat().reduce((a, x) => (x ? a + 1 : a), 0)
}
console.log(`[Part #2]: ${part2()}`)
