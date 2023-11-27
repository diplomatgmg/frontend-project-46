import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const readFile = (filePath) => fs.readFileSync(filePath, 'utf8');

export default function parse(filePath) {
  const extension = path.extname(filePath);

  const fileData = readFile(filePath, 'utf8');

  switch (extension) {
    case '.json':
      return JSON.parse(fileData);
    case '.yml':
    case '.yaml':
      return yaml.load(fileData);
    default:
      throw new Error(`File extensions must be JSON or YAML. Not ${extension}.`);
  }
}
