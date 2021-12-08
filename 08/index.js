const fs = require('fs')
let input = fs
  .readFileSync(`${__dirname}/input.txt`)
  .toString()
  .split('\n')
  .map((x) => x.split(' | ').map((y) => y.split(' ')))

const part1 = () => {
  return input
    .map((x) => x[1])
    .reduce((a, v) => a + v.reduce((b, u) => ([2, 3, 4, 7].includes(u.length) ? b + 1 : b), 0), 0)
}
console.log(`[Part #1]: ${part1()}`)

const part2 = () => {
  let outputs = []
  const realSegments = [
    'abcefg',
    'cf',
    'acdeg',
    'acdfg',
    'bcdf',
    'abdfg',
    'abdefg',
    'acf',
    'abcdefg',
    'abcdfg',
  ]
  const flippedSegments = Object.entries({ ...realSegments }).reduce((a, [key, value]) => {
    a[value] = Number(key)
    return a
  }, {})

  // prettier-ignore
  const subtraction = (a, b) => a.split('').filter((c) => !b.includes(c)).join('')
  // prettier-ignore
  const intersection = (a, b) => a.split('').filter((c) => b.includes(c)).join('')

  input.forEach((display) => {
    const [signals, digits] = display

    let mapping = { a: '', b: '', c: '', d: '', e: '', f: '', g: '' }
    let segments = ['', '', '', '', '', '', '', '', '', '']

    // 1: c,f
    segments[1] = signals.find((x) => x.length === 2)
    // 4: b,c,d,f
    segments[4] = signals.find((x) => x.length === 4)
    // 7: a,c,f
    segments[7] = signals.find((x) => x.length === 3)
    // 8: a,b,c,d,e,f,g
    segments[8] = signals.find((x) => x.length === 7)

    mapping.a = [segments[7], segments[1]].reduce(subtraction)

    const horizontalSegments = [...signals.filter((x) => x.length === 5)].reduce(intersection)

    mapping.d = [horizontalSegments, segments[4]].reduce(intersection)

    mapping.g = [horizontalSegments, mapping.a, mapping.d].reduce(subtraction)

    const sixNine = signals.filter((x) => x.length === 6).filter((x) => x.includes(mapping.d))
    const sixNineWith1 = sixNine.map((x) => [x, segments[1]].reduce(intersection))
    mapping.f = sixNineWith1.find((x) => x.length === 1)
    mapping.c = [sixNineWith1.find((x) => x.length === 2), mapping.f].reduce(subtraction)
    mapping.b = [segments[4], mapping.c, mapping.d, mapping.f].reduce(subtraction)
    mapping.e = [segments[8], ...Object.values(mapping)].reduce(subtraction)

    // use the mapping to generate the output digits
    const flippedMap = Object.entries(mapping).reduce((a, [key, value]) => {
      a[value] = key
      return a
    }, {})

    const sortedDigits = digits.map((x) =>
      [...x.split('').map((y) => flippedMap[y])].sort().join('')
    )
    const mappedDigits = sortedDigits.map((x) => flippedSegments[x]).join('')

    outputs.push(Number(mappedDigits))
  })
  return outputs.reduce((a, b) => a + b, 0)
}
console.log(`[Part #2]: ${part2()}`)
