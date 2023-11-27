import path from 'path'
import fs from 'fs'
import yaml from 'js-yaml'

type ValueTypes = string | number | boolean | null | undefined | Record<string, unknown>;

function readFile (filePath: string) {
  return fs.readFileSync(filePath, 'utf8')
}

export default function parse (filePath: string): Record<string, ValueTypes> {
  const extension = path.extname(filePath)

  const fileData = readFile(filePath)

  switch (extension) {
    case '.json':
      return JSON.parse(fileData)
    case '.yml':
    case '.yaml':
      return yaml.load(fileData) as Record<string, ValueTypes>
    default:
      throw new Error(`File extensions must be JSON or YAML. Not ${extension}.`)
  }
}
