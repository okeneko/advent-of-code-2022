const fs = require('fs')
const input = fs
  .readFileSync(`${__dirname}/input.txt`, 'utf8')
  .split('\n$')
  .map((x) => x.replace(/^\$?\s/, '').split('\n'))

let fileSystem = {}
let current = fileSystem

input.forEach((x) => {
  const [command, argument] = x[0].split(' ')
  switch (command) {
    case 'cd': {
      if (!('name' in fileSystem)) {
        fileSystem.type = 'dir'
        fileSystem.name = argument
        fileSystem.parent = fileSystem
        fileSystem.ls = []
        break
      }

      if (argument === '..') {
        current = current.parent
        break
      }

      current = current.ls.filter((x) => x.type === 'dir' && x.name === argument)[0]
      break
    }

    case 'ls': {
      const [_, ...ls] = x
      ls.forEach((file) => {
        if (file.split(' ')[0] === 'dir') {
          const [_, dirName] = file.split(' ')
          if (current.ls.filter((x) => x.type === 'dir' && x.name === dirName).length === 0) {
            current.ls.push({ type: 'dir', name: dirName, parent: current, ls: [] })
          }
        }

        if (!isNaN(file.split(' ')[0])) {
          const [size, fileName] = file.split(' ')
          if (current.ls.filter((x) => x.type === 'file' && x.name === fileName).length === 0) {
            current.ls.push({ type: 'file', name: fileName, size: Number(size) })
          }
        }
      })

      break
    }
  }
})

current = fileSystem

const getDirSize = (dir) =>
  dir.ls.reduce((totalSize, file) => {
    if (file.type === 'file') return totalSize + file.size
    if (file.type === 'dir') return totalSize + getDirSize(file)
  }, 0)

const dirSizes = (dir) => [
  { name: dir.name, size: getDirSize(dir) },
  ...dir.ls
    .filter((x) => x.type === 'dir')
    .reduce((sizes, currentDir) => [...sizes, ...dirSizes(currentDir)], []),
]

const part1 = () =>
  dirSizes(fileSystem)
    .filter((x) => x.size <= 100000)
    .reduce((sum, { size }) => sum + size, 0)
console.log(`[Part #1]: ${part1()}`) // 1491614

const part2 = () => {
  const totalSize = 70000000
  const maxUnused = 30000000
  const unused = totalSize - getDirSize(fileSystem)
  const minSizeToDelete = maxUnused - unused

  return Math.min(
    ...dirSizes(fileSystem)
      .filter((x) => x.size > minSizeToDelete)
      .map((x) => x.size)
  )
}
console.log(`[Part #2]: ${part2()}`) // 6400111
