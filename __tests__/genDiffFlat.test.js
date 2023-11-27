import path from 'path';
import genDiff from '../index.js';

const fixturesDir = path.join(__dirname, '..', '__fixtures__');

const makeFilePath = (fileName) => path.join(fixturesDir, fileName);

const expectData = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('diff json files test', () => {
  const filePath1 = makeFilePath('file1.json');
  const filePath2 = makeFilePath('file2.json');

  expect(genDiff(filePath1, filePath2)).toEqual(expectData);
});

test('diff yaml files test', () => {
  const filePath1 = makeFilePath('file1.yaml');
  const filePath2 = makeFilePath('file2.yaml');

  expect(genDiff(filePath1, filePath2)).toEqual(expectData);
});

test('unsupported file test', () => {
  const filePath = makeFilePath('unsupported.txt');
  expect(() => genDiff(filePath, filePath)).toThrow(Error);
});
