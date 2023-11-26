import parseFile from './parseFile.js';

export default (filePath1, filePath2) => {
  const fileData1 = parseFile(filePath1);
  const fileData2 = parseFile(filePath2);

  return [fileData1, fileData2];
};
