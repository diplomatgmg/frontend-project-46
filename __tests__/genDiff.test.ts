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
  const filePathJson1 = getFilePath('file1.json')
  const filePathJson2 = getFilePath('file2.json')
  const filePathYaml1 = getFilePath('file1.yaml')
  const filePathYaml2 = getFilePath('file2.yaml')

  const expectedStylishData = loadFixture('expectedStylish')
  const expectedPlainData = loadFixture('expectedPlain')
  const expectedJsonData = loadFixture('expectedJson')

  describe('Diff stylish files test', () => {
    test('Diff stylish JSON', () => {
      expect(genDiff(filePathJson1, filePathJson2)).toEqual(expectedStylishData)
    })

    test('Diff stylish YAML', () => {
      expect(genDiff(filePathYaml1, filePathYaml2)).toEqual(expectedStylishData)
    })
  })

  describe('Diff plain files test', () => {
    test('Diff plain JSON', () => {
      expect(genDiff(filePathJson1, filePathJson2, 'plain')).toEqual(expectedPlainData)
    })

    test('Diff plain YAML', () => {
      expect(genDiff(filePathYaml1, filePathYaml2, 'plain')).toEqual(expectedPlainData)
    })
  })

  describe('Diff json format files test', () => {
    test('Diff json JSON', () => {
      expect(genDiff(filePathJson1, filePathJson2, 'json')).toEqual(expectedJsonData)
    })
  })
})

test('Unsupported file extension', () => {
  const filePathUnsupported = getFilePath('unsupported.txt')

  expect(() => genDiff(filePathUnsupported, filePathUnsupported)).toThrow()
})
