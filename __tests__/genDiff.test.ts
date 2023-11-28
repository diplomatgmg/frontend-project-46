import path from 'path'
import genDiff from '../index'
import fs from 'fs'

const fixturesDir = path.join(__dirname, '..', '__fixtures__')

function loadFixture (fileName: string): string {
  return fs.readFileSync(path.join(fixturesDir, fileName), 'utf-8').trim()
}

function getFilePath (fileName: string): string {
  return path.join(fixturesDir, fileName)
}

describe('Diff stylish files test', () => {
  const expectedData = loadFixture('expectedStylish')

  test('Diff JSON', () => {
    const filePath1 = getFilePath('file1.json')
    const filePath2 = getFilePath('file2.json')

    expect(genDiff(filePath1, filePath2)).toEqual(expectedData)
  })

  test('Diff YAML', () => {
    const filePath1 = getFilePath('file1.yaml')
    const filePath2 = getFilePath('file2.yaml')

    expect(genDiff(filePath1, filePath2)).toEqual(expectedData)
  })
})

describe('Diff plain files test', () => {
  const expectedData = loadFixture('expectedPlain')

  test('Diff stylish JSON', () => {
    const filePath1 = getFilePath('file1.json')
    const filePath2 = getFilePath('file2.json')

    expect(genDiff(filePath1, filePath2, 'plain')).toEqual(expectedData)
  })

  test('Diff stylish YAML', () => {
    const filePath1 = getFilePath('file1.yaml')
    const filePath2 = getFilePath('file2.yaml')

    expect(genDiff(filePath1, filePath2, 'plain')).toEqual(expectedData)
  })
})

describe('Diff JSON format files test', () => {
  const expectedData = loadFixture('expectedJson')

  test('Diff JSON JSON', () => {
    const filePath1 = getFilePath('file1.json')
    const filePath2 = getFilePath('file2.json')

    expect(genDiff(filePath1, filePath2, 'json')).toEqual(expectedData)
  })
})

test('Unsupported file extension', () => {
  const filePath1 = getFilePath('unsupported.txt')
  const filePath2 = getFilePath('unsupported.txt')

  expect(() => genDiff(filePath1, filePath2)).toThrow()
})
