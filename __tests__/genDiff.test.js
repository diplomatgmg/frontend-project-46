import path from 'path';
import genDiff from '../index.js';

const fixturesDir = path.join(__dirname, '..', '__fixtures__');

test('read files test', () => {
  const filePath1 = path.join(fixturesDir, 'file1.json');
  const filePath2 = path.join(fixturesDir, 'file2.json');

  const expectData1 = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };

  const expectData2 = {
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  };

  expect(genDiff(filePath1, filePath2)).toEqual([expectData1, expectData2]);
});
