import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';
import compareJson from './compareJson.js';

const readFile = (filePath) => fs.readFileSync(filePath, 'utf8');

export default (filePath1, filePath2) => {
  const fileExtName1 = path.extname(filePath1);
  const fileExtName2 = path.extname(filePath2);

  const fileData1 = readFile(filePath1, 'utf8');
  const fileData2 = readFile(filePath2, 'utf8');

  const isJson = fileExtName2 === '.json' && fileExtName2 === '.json';

  if (isJson) {
    return compareJson(JSON.parse(fileData1), JSON.parse(fileData2));
  }

  const isYaml = ['.yaml', '.yml'].includes(fileExtName1) && ['.yaml', '.yml'].includes(fileExtName2);

  if (isYaml) {
    return compareJson(yaml.load(fileData1), yaml.load(fileData2));
  }

  throw new Error(`File extensions must be equal and be either JSON or YAML. Not ${fileExtName1} or ${fileExtName2}`);
};
