const fs = require('fs')
const manhattanDistance = ([x1, y1], [x2, y2]) => Math.abs(x1 - x2) + Math.abs(y1 - y2)
const input = fs
  .readFileSync(`${__dirname}/input.txt`, 'utf8')
  .split('\n')
  .map((x) => {
    const [sensorX, sensorY, beaconX, beaconY] = x
      .match(/Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/)
      .slice(1)
      .map(Number)

    return {
      sensor: [sensorX, sensorY],
      beacon: [beaconX, beaconY],
      distance: manhattanDistance([sensorX, sensorY], [beaconX, beaconY]),
    }
  })

const part1 = () => {
  const row = 2000000
  const minCol = Math.min(...input.map(({ sensor: [x, _], distance }) => x - distance))
  const maxCol = Math.max(...input.map(({ sensor: [x, _], distance }) => x + distance))

  let noBeacon = 0
  for (let i = minCol; i <= maxCol; i++) {
    if (!input.find(({ sensor, distance }) => manhattanDistance(sensor, [i, row]) <= distance))
      continue
    if (input.find(({ beacon: [x, y] }) => x === i && y === row)) continue
    noBeacon++
  }

  return noBeacon
}
console.log(`[Part #1]: ${part1()}`) // 4961647

const tuningFrequency = (x, y) => x * 4000000 + y
const isDetected = (x, y) =>
  input.find(({ sensor, distance }) => manhattanDistance(sensor, [x, y]) <= distance)

const part2 = () => {
  const max = 4000000
  let frequency = 0

  const findEdges = ([x, y], distance) => {
    let edges = []
    for (let i = -distance; i <= distance; i++) {
      let j = distance - i
      const [newX, newY] = [x + i, y + j]
      if (manhattanDistance([x, y], [newX, newY]) === distance) {
        if (newX < 0 || newY < 0 || newX > max || newY > max) continue
        edges.push([newX, newY])
      }
    }
    return edges
  }

  input
    .flatMap(({ sensor, distance }) => findEdges(sensor, distance + 1))
    .forEach(([x, y]) => {
      if (isDetected(x, y)) return
      frequency = tuningFrequency(x, y)
    })

  return frequency
}
console.log(`[Part #2]: ${part2()}`) // 12274327017867
