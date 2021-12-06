const fs = require('fs')
let input = fs.readFileSync(`${__dirname}/input.txt`).toString().split('\n')

const part1 = () => {
  let gamma = ''
  let epsilon = ''
  for (let i = 0; i < input[0].length; i++) {
    const [zero, one] = input.reduce(
      (acc, val) => {
        const bit = parseInt(val[i])
        acc[bit]++
        return acc
      },
      [0, 0]
    )

    if (zero > one) {
      gamma += '0'
      epsilon += '1'
    } else {
      gamma += '1'
      epsilon += '0'
    }
  }

  return parseInt(gamma, 2) * parseInt(epsilon, 2)
}
console.log(`[Part #1]: ${part1()}`)

const part2 = () => {
  let oNumbers = [...input]
  let co2Numbers = [...input]
  for (let i = 0; i < input[0].length; i++) {
    if (oNumbers.length > 1) {
      const [zero, one] = oNumbers.reduce(
        (acc, val) => {
          const bit = parseInt(val[i])
          acc[bit]++
          return acc
        },
        [0, 0]
      )

      if (zero > one) oNumbers = oNumbers.filter((x) => parseInt(x[i]) === 0)
      else oNumbers = oNumbers.filter((x) => parseInt(x[i]) === 1)
    }

    if (co2Numbers.length > 1) {
      const [zero, one] = co2Numbers.reduce(
        (acc, val) => {
          const bit = parseInt(val[i])
          acc[bit]++
          return acc
        },
        [0, 0]
      )

      if (zero > one)
        co2Numbers = co2Numbers.filter((x) => parseInt(x[i]) === 1)
      else co2Numbers = co2Numbers.filter((x) => parseInt(x[i]) === 0)
    }
  }
  return parseInt(oNumbers[0], 2) * parseInt(co2Numbers[0], 2)
}
console.log(`[Part #2]: ${part2()}`)
