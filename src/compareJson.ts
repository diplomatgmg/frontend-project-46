import { DiffNode, ValueTypes } from './types'

function sortKeys (keys: string[]): string[] {
  return keys.sort((a, b) => {
    const cleanA = a.startsWith('+-') ? a.slice(2) : a
    const cleanB = b.startsWith('+-') ? b.slice(2) : b
    return cleanA.localeCompare(cleanB)
  })
}

export default function generateDiff (obj1: Record<string, ValueTypes>, obj2: Record<string, ValueTypes>): Record<string, DiffNode> {
  const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])]
  const sortedKeys = sortKeys(keys)

  return sortedKeys.reduce((acc, key) => {
    if (obj1[key] === undefined) {
      acc[key] = {
        value: obj2[key],
        type: 'added'
      }
    } else if (obj2[key] === undefined) {
      acc[key] = {
        value: obj1[key],
        type: 'removed'
      }
    } else if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      acc[key] = {
        type: 'nested',
        children: generateDiff(obj1[key] as Record<string, DiffNode>, obj2[key] as Record<string, DiffNode>)
      }
    } else if (obj1[key] === obj2[key]) {
      acc[key] = {
        value: obj1[key],
        type: 'unchanged'
      }
    } else {
      acc[key] = {
        value: obj2[key],
        oldValue: obj1[key],
        type: 'changed'
      }
    }

    return acc
  }, {} as Record<string, DiffNode>)
}
