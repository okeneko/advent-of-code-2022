const fs = require('fs')
const input = fs
  .readFileSync(`${__dirname}/input.txt`, 'utf8')
  .split('\n')
  .map((x) => x.split('-'))

const part1 = () => {
  let graph = [...new Set(input.flat())].reduce((a, x) => ({ ...a, [x]: [] }), {})
  for (const cave in graph) {
    graph[cave] = input.filter((x) => x.includes(cave)).flatMap((x) => x.filter((y) => y !== cave))
  }

  const paths = (cave, path) => {
    if (cave === 'end') return 1
    if (cave === 'start' && path.length > 0) return 0
    if (cave === cave.toLowerCase() && path.includes(cave)) return 0
    return graph[cave].reduce((a, x) => a + paths(x, [...path, cave]), 0)
  }

  return paths('start', [])
}
console.log(`[Part #1]: ${part1()}`)

const part2 = () => {
  let graph = [...new Set(input.flat())].reduce((a, x) => ({ ...a, [x]: [] }), {})
  for (const cave in graph) {
    graph[cave] = input.filter((x) => x.includes(cave)).flatMap((x) => x.filter((y) => y !== cave))
  }

  const paths = (cave, path) => {
    if (cave === 'end') return 1
    if (cave === 'start' && path.length > 0) return 0
    if (
      // prettier-ignore
      cave === cave.toLowerCase() &&
      path.includes(cave) &&
      [...new Set(path.filter((x) => x !== 'start' && x === x.toLowerCase()))]
        .some((x) => path.filter((y) => y === x).length > 1)
    )
      return 0

    return graph[cave].reduce((a, x) => a + paths(x, [...path, cave]), 0)
  }

  return paths('start', [])
}
console.log(`[Part #2]: ${part2()}`)
