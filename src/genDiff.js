import compareJson from './compareJson.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import json from './formatters/json.js';
import parse from './parse.js';

export default (filePath1, filePath2, format) => {
  const fileData1 = parse(filePath1);
  const fileData2 = parse(filePath2);

  const difference = compareJson(fileData1, fileData2);

  switch (format) {
    case 'plain':
      return plain(difference);
    case 'json':
      return json(difference);
    default:
      return stylish(difference);
  }
};
