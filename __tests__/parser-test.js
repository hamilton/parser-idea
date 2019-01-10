import { locateField, locateOperation } from '../src/parser'
import { captureVsComparator } from '../src/operator'
// import { semVer } from '../src/comparators'

const DO_NOTHING = () => {}

const PROTOTYPE = {
  operations: [
    {
      operation: 'vs',
      key: 'compare',
      function: DO_NOTHING,
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

describe('locateField', () => {
  const testStrings = [
    { in: '61', out: { type: 'field', key: 'version', value: '61' } },
    { in: 'Firefox', out: { type: 'field', key: 'product', value: 'Firefox' } }]
  it('returns correct values for locateField', () => {
    testStrings.forEach((f) => {
      expect(locateField(f.in, PROTOTYPE)).toEqual(f.out)
    })
  })
  it('returns an undefined if there is no match', () => {
    expect(locateField('NO_MATCH', PROTOTYPE)).toEqual({ key: undefined, value: 'NO_MATCH' })
  })
  it('throws if not passed a string', () => {
    expect(() => locateField(new Date(), PROTOTYPE)).toThrow()
  })
})

describe('locateOperation', () => {
  const testStrings = [
    {
      in: 'vs',
      out: {
        type: 'operation', key: 'compare', value: 'vs', function: DO_NOTHING,
      },
    },
    {
      in: 'VS',
      out: {
        type: 'operation', key: 'compare', value: 'vs', function: DO_NOTHING,
      },
    },
    {
      in: 'vS.',
      out: {
        type: 'operation', key: 'compare', value: 'vs', function: DO_NOTHING,
      },
    },
    { in: 'NO_MATCH', out: { type: undefined, value: 'NO_MATCH' } },
  ]
  it('maps to the correct operation', () => {
    testStrings.forEach((o) => {
      expect(locateOperation(o.in, PROTOTYPE)).toEqual(o.out)
    })
  })
  it('throws if not passed a string', () => {
    expect(() => locateOperation(new Date(), PROTOTYPE)).toThrow()
  })
})

// describe('Parser with vanilla settings', () => {
//   let parser
//   beforeEach(() => {
//     parser = new Parser(PROTOTYPE)
//   })
//   it('returns an extra error field when grouping grammar is abused', () => {
//     expect(parser.parse('vs vs vs vs vs vs vs vs'))
//       .toEqual({ groups: {}, comparisons: {}, errors: 'error encountered at token 0' })
//     expect(parser.parse('vs a vs vs'))
//       .toEqual({ groups: {}, comparisons: {}, errors: 'error encountered at token 0' })
//     expect(parser.parse('vs')).toEqual({ groups: {}, comparisons: {}, errors: 'error encountered at token 0' })
//     expect(parser.parse('vs a')).toEqual({ groups: {}, comparisons: {}, errors: 'error encountered at token 0' })
//     expect(parser.parse('a vs')).toEqual({ groups: {}, comparisons: {}, errors: 'error encountered at token 0' })
//     expect(parser.parse('vs a b')).toEqual({ groups: {}, comparisons: {}, errors: 'error encountered at token 0' })
//     expect(parser.parse('a b vs')).toEqual({ groups: {}, comparisons: {}, errors: 'error encountered at token 0' })
//   })
//   it('returns an extra error field when a field is not valid', () => {
//     expect(parser.parse('a b,c US UK')).toEqual({
//       comparisons: {},
//       groups: {},
//       errors: 'token UK not valid',
//     })
//   })
//   it('parses valid strings', () => {
//     expect(parser.parse('a vs b')).toEqual({ groups: {}, comparisons: { locale: ['a', 'b'] } })
//     expect(parser.parse('a vs b 61 62 63')).toEqual({
//       groups: { version: ['61', '62', '63'] },
//       comparisons: {
//         locale: ['a', 'b'],
//       },
//     })
//     expect(parser.parse('a b c d 61 62 63 Firefox, Fenix Focus Nightly Beta Release')).toEqual({
//       groups:
//       {
//         locale: ['a', 'b', 'c', 'd'],
//         version: ['61', '62', '63'],
//         product: ['Firefox', 'Fenix', 'Focus'],
//         channel: ['Nightly', 'Beta', 'Release'],
//       },
//       comparisons: {},
//     })
//     expect(parser.parse('a b c, US DK, 61 vs 62 vs    63, w x y z,,, Nightly Vs. Beta vs Release')).toEqual({
//       comparisons: {
//         channel: ['Nightly', 'Beta', 'Release'],
//         version: ['61', '62', '63'],
//       },
//       groups: {
//         locale: ['a', 'b', 'c', 'w', 'x', 'y', 'z'],
//         geo: ['US', 'DK'],
//       },
//     })
//   })
// })


/*

Firefox 63
Firefox 63 nightly, en-us
Firefox 63 release, GB
Firefox 63 release, comparing gb, us, pt
Firefox 63 release en-US, gb vs. us vs. pt

*/
