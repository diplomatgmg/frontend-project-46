import { DiffNode } from '../types.js'

type AddedNode = { type: 'added'; value: string | null };
type ChangedNode = { type: 'changed'; value: string | null; oldValue: string | null };

function stringifyValue (value: string | null): string | null {
  if (value === null) {
    return null
  }

  switch (typeof value) {
    case 'object':
      return '[complex value]'
    case 'string':
      return `'${value}'`
    default:
      return value
  }
}

export default function plain (diff: Record<string, DiffNode>): string {
  const result: string[] = []

  function plainRecursion (diffObj: Record<string, DiffNode>, path: string[] = []) {
    const keys = Object.keys(diffObj)

    keys.forEach((key) => {
      const node = diffObj[key]
      const newPath = [...path, key]
      const joinPath = newPath.join('.')

      switch (node.type) {
        case 'nested':
          plainRecursion(node.children, newPath)
          break
        case 'added':
          result.push(`Property '${joinPath}' was added with value: ${stringifyValue((node as AddedNode).value)}`)
          break
        case 'removed':
          result.push(`Property '${joinPath}' was removed`)
          break
        case 'changed':
          result.push(`Property '${joinPath}' was updated. From ${stringifyValue((node as ChangedNode).oldValue)} to ${stringifyValue((node as ChangedNode).value)}`)
      }
    })
  }

  plainRecursion(diff)

  return result.join('\n')
}
