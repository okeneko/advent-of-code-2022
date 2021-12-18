const fs = require('fs')
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n').map(JSON.parse)

const explodeOnce = (pair) => {
  const pairString = JSON.stringify(pair)

  let depth = 0
  for (let idx = 0; idx < pairString.length; idx++) {
    if (depth === 4 && pairString[idx] === '[') {
      const explodingPair = JSON.parse(pairString.slice(idx, pairString.indexOf(']', idx) + 1))

      let left = pairString.slice(0, idx)
      for (let leftI = left.length - 1; leftI >= 0; leftI--) {
        if (!isNaN(left[leftI])) {
          let leftEndI = leftI - 1
          let leftValue = [left[leftI]]
          while (leftEndI > 0) {
            if (isNaN(left[leftEndI])) break
            leftValue.push(left[leftEndI])
            leftEndI--
          }
          leftValue = Number([...leftValue].reverse().join(''))

          let newValue = leftValue + explodingPair[0]

          left = left.slice(0, leftEndI + 1) + newValue + left.slice(leftI + 1)
          break
        }
      }

      let right = pairString.slice(pairString.indexOf(']', idx) + 1)
      for (let rightI = 0; rightI < right.length; rightI++) {
        if (!isNaN(right[rightI])) {
          let rightEndI = rightI + 1
          let rigthValue = [right[rightI]]
          while (rightEndI < right.length - 1) {
            if (isNaN(right[rightEndI])) break
            rigthValue.push(right[rightEndI])
            rightEndI++
          }
          rigthValue = Number(rigthValue.join(''))

          let newValue = rigthValue + explodingPair[1]
          right = right.slice(0, rightI) + newValue + right.slice(rightEndI)
          break
        }
      }
      return JSON.parse(left + '0' + right)
    }

    if (pairString[idx] === '[') depth++
    if (pairString[idx] === ']') depth--
  }
  return pair
}

const splitOnce = (pair) => {
  let splitPair = JSON.parse(JSON.stringify(pair))
  for (const i in pair) {
    if (typeof pair[i] === 'number' && pair[i] >= 10) {
      splitPair[i] = [Math.floor(pair[i] / 2), Math.ceil(pair[i] / 2)]
      return splitPair
    }
    for (const j in pair[i]) {
      if (typeof pair[i][j] === 'number' && pair[i][j] >= 10) {
        splitPair[i][j] = [Math.floor(pair[i][j] / 2), Math.ceil(pair[i][j] / 2)]
        return splitPair
      }
      for (const k in pair[i][j]) {
        if (typeof pair[i][j][k] === 'number' && pair[i][j][k] >= 10) {
          splitPair[i][j][k] = [Math.floor(pair[i][j][k] / 2), Math.ceil(pair[i][j][k] / 2)]
          return splitPair
        }
        for (const l in pair[i][j][k]) {
          if (typeof pair[i][j][k][l] === 'number' && pair[i][j][k][l] >= 10) {
            splitPair[i][j][k][l] = [
              Math.floor(pair[i][j][k][l] / 2),
              Math.ceil(pair[i][j][k][l] / 2),
            ]
            return splitPair
          }
        }
      }
    }
  }
  return pair
}

const reducePair = (reducible) => {
  let pair = JSON.parse(JSON.stringify(reducible))

  while (true) {
    // look for explodable pairs
    let explodedPair = explodeOnce(pair)
    if (JSON.stringify(explodedPair) !== JSON.stringify(pair)) {
      pair = JSON.parse(JSON.stringify(explodedPair))
      continue
    }

    // look for splitable numbers
    let splitPair = splitOnce(pair)
    if (JSON.stringify(splitPair) !== JSON.stringify(pair)) {
      pair = JSON.parse(JSON.stringify(splitPair))
      continue
    }

    break
  }

  return pair
}

const magnitude = (x) => (typeof x === 'number' ? x : 3 * magnitude(x[0]) + 2 * magnitude(x[1]))

const part1 = () => magnitude(input.reduce((a, b) => reducePair([a, b])))
console.log(`[Part #1]: ${part1()}`)

const part2 = () => {
  let magnitudes = []

  input.forEach((x, i) => {
    input.forEach((y, j) => {
      if (i !== j) magnitudes.push(magnitude(reducePair([x, y])))
    })
  })

  return Math.max(...magnitudes)
}
console.log(`[Part #2]: ${part2()}`)
