import path from 'path'
import genDiff from '../index'

const fixturesDir = path.join(__dirname, '..', '__fixtures__')

describe('diff stylish files test', () => {
  const expectedData = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`

  test('diff json', () => {
    const filePath1 = path.join(fixturesDir, 'file1.json')
    const filePath2 = path.join(fixturesDir, 'file2.json')

    expect(genDiff(filePath1, filePath2)).toEqual(expectedData)
  })

  test('diff yaml', () => {
    const filePath1 = path.join(fixturesDir, 'file1.yaml')
    const filePath2 = path.join(fixturesDir, 'file2.yaml')

    expect(genDiff(filePath1, filePath2)).toEqual(expectedData)
  })
})

describe('diff plain files test', () => {
  const expectedData = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`

  test('diff stylish json', () => {
    const filePath1 = path.join(fixturesDir, 'file1.json')
    const filePath2 = path.join(fixturesDir, 'file2.json')

    expect(genDiff(filePath1, filePath2, 'plain')).toEqual(expectedData)
  })

  test('diff stylish yaml', () => {
    const filePath1 = path.join(fixturesDir, 'file1.yaml')
    const filePath2 = path.join(fixturesDir, 'file2.yaml')

    expect(genDiff(filePath1, filePath2, 'plain')).toEqual(expectedData)
  })
})

describe('diff json format files test', () => {
  const expectedData = '{"common":{"type":"nested","children":{"follow":{"value":false,"type":"added"},"setting1":{"value":"Value 1","type":"unchanged"},"setting2":{"value":200,"type":"removed"},"setting3":{"value":null,"oldValue":true,"type":"changed"},"setting4":{"value":"blah blah","type":"added"},"setting5":{"value":{"key5":"value5"},"type":"added"},"setting6":{"type":"nested","children":{"doge":{"type":"nested","children":{"wow":{"value":"so much","oldValue":"","type":"changed"}}},"key":{"value":"value","type":"unchanged"},"ops":{"value":"vops","type":"added"}}}}},"group1":{"type":"nested","children":{"baz":{"value":"bars","oldValue":"bas","type":"changed"},"foo":{"value":"bar","type":"unchanged"},"nest":{"value":"str","oldValue":{"key":"value"},"type":"changed"}}},"group2":{"value":{"abc":12345,"deep":{"id":45}},"type":"removed"},"group3":{"value":{"deep":{"id":{"number":45}},"fee":100500},"type":"added"}}'

  test('diff json json', () => {
    const filePath1 = path.join(fixturesDir, 'file1.json')
    const filePath2 = path.join(fixturesDir, 'file2.json')

    expect(genDiff(filePath1, filePath2, 'json')).toEqual(expectedData)
  })
})

test('unsupported file extension', () => {
  const filePath1 = path.join(fixturesDir, 'unsupported.txt')
  const filePath2 = path.join(fixturesDir, 'unsupported.txt')

  expect(() => genDiff(filePath1, filePath2)).toThrow()
})
