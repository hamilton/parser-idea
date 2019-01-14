import parse from '../src/parser'
import { captureVsComparator } from '../src/operator'
import { PRODUCT_DASHBOARD } from './test-grammars'

describe('parse', () => {
  const tests = [
    {
      in: 'a b c d 61 62, 63 WHATEVER',
      out: {
        original: 'a b c d 61 62, 63 WHATEVER',
        instructions: [
          {
            operation: 'take',
            key: 'locale',
            values: ['a', 'b', 'c', 'd'],
          }, {
            operation: 'take',
            key: 'version',
            values: ['61', '62', '63'],
          },
        ],
        tokens: [
          { key: 'locale', type: 'field', value: 'a' },
          { key: 'locale', type: 'field', value: 'b' },
          { key: 'locale', type: 'field', value: 'c' },
          { key: 'locale', type: 'field', value: 'd' },
          { key: 'version', type: 'field', value: '61' },
          { key: 'version', type: 'field', value: '62' },
          { key: 'version', type: 'field', value: '63' },
          { key: undefined, value: 'WHATEVER' }],
        unmatchedTokens: [{ type: undefined, value: 'WHATEVER' }],
      },
    },
    {
      in: 'a b c 61 vs 62 vs 63, Release',
      out: {
        original: 'a b c 61 vs 62 vs 63, Release',
        instructions: [{
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
        tokens: [
          { type: 'field', key: 'locale', value: 'a' },
          { type: 'field', key: 'locale', value: 'b' },
          { type: 'field', key: 'locale', value: 'c' },
          { type: 'field', key: 'version', value: '61' },
          {
            type: 'operation', key: 'compare', value: 'vs', function: captureVsComparator,
          },
          { type: 'field', key: 'version', value: '62' },
          {
            type: 'operation', key: 'compare', value: 'vs', function: captureVsComparator,
          },
          { type: 'field', key: 'version', value: '63' },
          { type: 'field', key: 'channel', value: 'Release' },
        ],
        unmatchedTokens: [],
      },
    },
    {
      in: 'X Y Z',
      out: {
        original: 'X Y Z',
        instructions: [],
        tokens: [
          { type: undefined, value: 'X' },
          { type: undefined, value: 'Y' },
          { type: undefined, value: 'Z' }],
        unmatchedTokens: [
          { type: undefined, value: 'X' },
          { type: undefined, value: 'Y' },
          { type: undefined, value: 'Z' }],
      },
    },
  ]

  tests.forEach((t) => {
    it(t.in, () => {
      const out = parse(t.in, PRODUCT_DASHBOARD)
      expect(out).toEqual(t.out)
    })
  })
})
