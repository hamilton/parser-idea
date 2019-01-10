import { parse } from '../src/parser'
import { captureVsComparator } from '../src/operator'

const GRAMMAR_1 = {
  operations: [
    {
      operation: 'vs',
      key: 'compare',
      function: captureVsComparator,
    },
  ],
  fields: [
    {
      field: 'version',
      values: ['61', '62', '63'],
    },
    {
      field: 'locale',
      values: ['a', 'b', 'c', 'd', 'w', 'x', 'y', 'z'],
    },
    {
      field: 'product',
      values: ['Firefox', 'Fenix', 'Focus'],
    },
    {
      field: 'channel',
      values: ['Nightly', 'Beta', 'Release'],
    },
    {
      field: 'geo',
      values: ['US', 'DK', 'FR'],
    },
  ],
}

describe('parse', () => {
  const tests = [
    {
      in: 'a b c d 61 62, 63',
      out: [{
        operation: 'take',
        key: 'locale',
        values: ['a', 'b', 'c', 'd'],
      }, {
        operation: 'take',
        key: 'version',
        values: ['61', '62', '63'],
      }],
    },
    {
      in: 'a b c 61 vs 62 vs 63, Release',
      out: [{
        operation: 'compare',
        key: 'version',
        values: ['61', '62', '63'],
      },
      {
        operation: 'take',
        key: 'locale',
        values: ['a', 'b', 'c'],
      }, {
        operation: 'take',
        key: 'channel',
        values: ['Release'],
      }],
    },
  ]
  it('correctly parses out the operations and fields', () => {
    tests.forEach((t) => {
      expect(parse(t.in, GRAMMAR_1)).toEqual(t.out)
    })
  })
})
