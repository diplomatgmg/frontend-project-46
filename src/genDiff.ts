import compareJson from './compareJson'
import stylish from './formatters/stylish'
import plain from './formatters/plain'
import json from './formatters/json'
import parse from './parse'

import { DiffNode } from './types'

export default (filePath1: string, filePath2: string, format = 'stylish'): string => {
  const fileData1 = parse(filePath1)
  const fileData2 = parse(filePath2)

  const difference = compareJson(fileData1, fileData2)

  switch (format) {
    case 'plain':
      return plain(difference as Record<string, DiffNode>)
    case 'json':
      return json(difference as Record<string, DiffNode>)
    case 'stylish':
      return stylish(difference as Record<string, DiffNode>)
    default:
      throw new Error(`unexpected format - ${format}`)
  }
}
