import genDiff from '../index.js';

test('genDiff', () => {
  expect(genDiff('example1.txt', 'example2.txt')).toEqual(['example1.txt', 'example2.txt']);
});
