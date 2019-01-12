import { locateField, locateOperation, locateStopword, tagToken, split } from '../src/tokenize'
import { PRODUCT_DASHBOARD } from './test-grammars'
import { captureVsComparator } from '../src/operator'

const splits = [
  { in: 'a b c, 61, 62 63', out: ['a', ' ', 'b', ' ', 'c', ',', ' ', '61', ',', ' ', '62', ' ', '63'] },
  { in: 'whatever', out: ['whatever'] },
]

const stopwords = [
  {
    in: ',',
    out: {
      type: 'stopword', value: ',',
    },
  },
  {
    in: ' ',
    out: {
      type: 'stopword', value: ' ',
    },
  },
  { in: 'NO_MATCH', out: { type: undefined, value: 'NO_MATCH' } },
]

const fields = [
  { in: '61', out: { type: 'field', key: 'version', value: '61' } },
  { in: 'Firefox', out: { type: 'field', key: 'product', value: 'Firefox' } },
  { in: 'NO_MATCH', out: { type: undefined, value: 'NO_MATCH' } }]

const operations = [
  {
    in: 'vs',
    out: {
      type: 'operation', key: 'compare', value: 'vs', function: captureVsComparator,
    },
  },
  {
    in: 'VS',
    out: {
      type: 'operation', key: 'compare', value: 'vs', function: captureVsComparator,
    },
  },
  {
    in: 'vS.',
    out: {
      type: 'operation', key: 'compare', value: 'vs', function: captureVsComparator,
    },
  },
  { in: 'NO_MATCH', out: { type: undefined, value: 'NO_MATCH' } },
]

describe('split', () => {
  it('splits on the delimiter', () => {
    splits.forEach((s) => {
      expect(split(s.in, PRODUCT_DASHBOARD)).toEqual(s.out)
    })
  })
})

describe('locateField', () => {
  it('returns correct values for locateField', () => {
    fields.forEach((f) => {
      expect(locateField(f.in, PRODUCT_DASHBOARD)).toEqual(f.out)
    })
  })
  it('returns an undefined if there is no match', () => {
    expect(locateField('NO_MATCH', PRODUCT_DASHBOARD)).toEqual({ key: undefined, value: 'NO_MATCH' })
  })
  it('throws if not passed a string', () => {
    expect(() => locateField(new Date(), PRODUCT_DASHBOARD)).toThrow()
  })
})

describe('locateOperation', () => {
  it('maps to the correct operation', () => {
    operations.forEach((o) => {
      expect(locateOperation(o.in, PRODUCT_DASHBOARD)).toEqual(o.out)
    })
  })
  it('throws if not passed a string', () => {
    expect(() => locateOperation(new Date(), PRODUCT_DASHBOARD)).toThrow()
  })
})

describe('locateStopword', () => {
  it('maps to the correct operation', () => {
    stopwords.forEach((o) => {
      expect(locateStopword(o.in, PRODUCT_DASHBOARD)).toEqual(o.out)
    })
  })
  it('throws if not passed a string', () => {
    expect(() => locateStopword(new Date(), PRODUCT_DASHBOARD)).toThrow()
  })
})

describe('tagToken', () => {
  it('locates stopwords', () => {
    stopwords.forEach((s) => {
      expect(tagToken(s.in, PRODUCT_DASHBOARD)).toEqual(s.out)
    })
  })
  it('locates fields', () => {
    fields.forEach((f) => {
      expect(tagToken(f.in, PRODUCT_DASHBOARD)).toEqual(f.out)
    })
  })
  it('locates operations', () => {
    operations.forEach((o) => {
      expect(tagToken(o.in, PRODUCT_DASHBOARD)).toEqual(o.out)
    })
  })
})
