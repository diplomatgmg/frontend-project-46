import path from 'path';
import genDiff from '../index.js';

const fixturesDir = path.join(__dirname, '..', '__fixtures__');

test('diff json files test', () => {
  const filePath1 = path.join(fixturesDir, 'file1.json');
  const filePath2 = path.join(fixturesDir, 'file2.json');

  const expectData = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(genDiff(filePath1, filePath2)).toEqual(expectData);
});

test('diff yaml files test', () => {
  const filePath1 = path.join(fixturesDir, 'file1.yaml');
  const filePath2 = path.join(fixturesDir, 'file2.yaml');

  const expectData = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(genDiff(filePath1, filePath2)).toEqual(expectData);
});

test('unsupported file test', () => {
  const filePath = path.join(fixturesDir, 'unsupported.txt');
  expect(() => genDiff(filePath, filePath)).toThrow(Error);
});
