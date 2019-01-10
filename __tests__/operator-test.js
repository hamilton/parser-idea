import { captureVsComparator } from '../src/operator'

describe('captureVsComparator', () => {
  it('correctly parses out the operator field and returns the rest untouched', () => {
    const A = [ // `a, b, 1 vs 2 vs 3 vs 4, c, d`
      { type: 'field', value: 'a', field: 'letter' },
      { type: 'field', value: 'b', field: 'letter' },
      { type: 'field', value: '1', field: 'number' },
      {
        type: 'operation', key: 'vs', value: 'vs', function: captureVsComparator,
      },
      { type: 'field', value: '2', field: 'number' },
      {
        type: 'operation', key: 'vs', value: 'vs', function: captureVsComparator,
      },
      { type: 'field', value: '3', field: 'number' },
      {
        type: 'operation', key: 'vs', value: 'vs', function: captureVsComparator,
      },
      { type: 'field', value: '4', field: 'number' },
      { type: 'field', value: 'c', field: 'letter' },
      { type: 'field', value: 'd', field: 'letter' },
    ]
    const [ops1, otherTokens1] = captureVsComparator(3, A)
    expect(ops1).toEqual([
      { type: 'field', value: '1', field: 'number' },
      { type: 'field', value: '2', field: 'number' },
      { type: 'field', value: '3', field: 'number' },
      { type: 'field', value: '4', field: 'number' },
    ])
    expect(otherTokens1).toEqual([
      { type: 'field', value: 'a', field: 'letter' },
      { type: 'field', value: 'b', field: 'letter' },
      { type: 'field', value: 'c', field: 'letter' },
      { type: 'field', value: 'd', field: 'letter' },
    ])
    const B = [ // `1 vs 2 vs 3`
      { type: 'field', value: '1', field: 'number' },
      {
        type: 'operation', key: 'vs', value: 'vs', function: captureVsComparator,
      },
      { type: 'field', value: '2', field: 'number' },
      {
        type: 'operation', key: 'vs', value: 'vs', function: captureVsComparator,
      },
      { type: 'field', value: '3', field: 'number' },
    ]
    const [ops2, otherTokens2] = captureVsComparator(1, B)
    expect(ops2).toEqual([
      { type: 'field', value: '1', field: 'number' },
      { type: 'field', value: '2', field: 'number' },
      { type: 'field', value: '3', field: 'number' },
    ])
    expect(otherTokens2).toEqual([])

    const C = [ // `1 vs 2 vs 3`
      { type: 'field', value: 'a', field: 'letter' },
      { type: 'field', value: 'b', field: 'letter' },
      { type: 'field', value: 'c', field: 'letter' },
      { type: 'field', value: '1', field: 'number' },
      {
        type: 'operation', key: 'vs', value: 'vs', function: captureVsComparator,
      },
      { type: 'field', value: '2', field: 'number' },
      {
        type: 'operation', key: 'vs', value: 'vs', function: captureVsComparator,
      },
      { type: 'field', value: '3', field: 'number' },
      { type: 'field', value: 'd', field: 'letter' },
      { type: 'field', value: 'X', field: 'variable' },
      {
        type: 'operation', key: 'vs', value: 'vs', function: captureVsComparator,
      },
      { type: 'field', value: 'Y', field: 'variable' },
      {
        type: 'operation', key: 'vs', value: 'vs', function: captureVsComparator,
      },
      { type: 'field', value: 'Z', field: 'variable' },

    ]
    const [opsC, otherTokensC] = captureVsComparator(4, C)
    expect(opsC).toEqual([
      { type: 'field', value: '1', field: 'number' },
      { type: 'field', value: '2', field: 'number' },
      { type: 'field', value: '3', field: 'number' },
    ])
    expect(otherTokensC).toEqual([
      { type: 'field', value: 'a', field: 'letter' },
      { type: 'field', value: 'b', field: 'letter' },
      { type: 'field', value: 'c', field: 'letter' },
      { type: 'field', value: 'd', field: 'letter' },
      { type: 'field', value: 'X', field: 'variable' },
      {
        type: 'operation', key: 'vs', value: 'vs', function: captureVsComparator,
      },
      { type: 'field', value: 'Y', field: 'variable' },
      {
        type: 'operation', key: 'vs', value: 'vs', function: captureVsComparator,
      },
      { type: 'field', value: 'Z', field: 'variable' },
    ])

    const [opsC2, otherTokensC2] = captureVsComparator(10, C)
    expect(opsC2).toEqual([
      { type: 'field', value: 'X', field: 'variable' },
      { type: 'field', value: 'Y', field: 'variable' },
      { type: 'field', value: 'Z', field: 'variable' },
    ])
    expect(otherTokensC2).toEqual([
      { type: 'field', value: 'a', field: 'letter' },
      { type: 'field', value: 'b', field: 'letter' },
      { type: 'field', value: 'c', field: 'letter' },
      { type: 'field', value: '1', field: 'number' },
      {
        type: 'operation', key: 'vs', value: 'vs', function: captureVsComparator,
      },
      { type: 'field', value: '2', field: 'number' },
      {
        type: 'operation', key: 'vs', value: 'vs', function: captureVsComparator,
      },
      { type: 'field', value: '3', field: 'number' },
      { type: 'field', value: 'd', field: 'letter' },
    ])

    const [opsC3, otherTokensC3] = captureVsComparator(4, otherTokensC2)
    expect(opsC3).toEqual([
      { type: 'field', value: '1', field: 'number' },
      { type: 'field', value: '2', field: 'number' },
      { type: 'field', value: '3', field: 'number' },
    ])
    expect(otherTokensC3).toEqual([
      { type: 'field', value: 'a', field: 'letter' },
      { type: 'field', value: 'b', field: 'letter' },
      { type: 'field', value: 'c', field: 'letter' },
      { type: 'field', value: 'd', field: 'letter' },
    ])
  })

  it('throws when vs is used incorrectly', () => {
    const A = [ // `vs 2 vs 3 ..`
      {
        type: 'operation', key: 'vs', value: 'vs', function: captureVsComparator,
      },
      { type: 'field', value: '2', field: 'number' },
      {
        type: 'operation', key: 'vs', value: 'vs', function: captureVsComparator,
      },
      { type: 'field', value: '3', field: 'number' },
      { type: 'field', value: 'a', field: 'letter' },
      { type: 'field', value: 'b', field: 'letter' },
    ]

    expect(() => captureVsComparator(0, A)).toThrow()

    const B = [ // vs vs
      {
        type: 'operation', key: 'vs', value: 'vs', function: captureVsComparator,
      },
      {
        type: 'operation', key: 'vs', value: 'vs', function: captureVsComparator,
      },
    ]

    expect(() => captureVsComparator(0, B)).toThrow()

    const C = [ // 2 vs vs 3
      { type: 'field', value: 'a', field: 'letter' },
      { type: 'field', value: '2', field: 'number' },
      {
        type: 'operation', key: 'vs', value: 'vs', function: captureVsComparator,
      },
      {
        type: 'operation', key: 'vs', value: 'vs', function: captureVsComparator,
      },
      { type: 'field', value: '3', field: 'number' },
    ]

    expect(() => captureVsComparator(0, C)).toThrow()


    const D = [ // b a 2 vs 3 vs
      { type: 'field', value: 'b', field: 'letter' },
      { type: 'field', value: 'a', field: 'letter' },
      { type: 'field', value: '2', field: 'number' },
      {
        type: 'operation', key: 'vs', value: 'vs', function: captureVsComparator,
      },
      { type: 'field', value: '3', field: 'number' },
      {
        type: 'operation', key: 'vs', value: 'vs', function: captureVsComparator,
      },
    ]

    expect(() => captureVsComparator(0, D)).toThrow()
  })
  it('throws when you compare two things that are not related', () => {
    const A = [ // `vs 2 vs 3 ..`
      { type: 'field', value: '2', field: 'number' },
      {
        type: 'operation', key: 'vs', value: 'vs', function: captureVsComparator,
      },
      { type: 'field', value: 'a', field: 'letter' },
      {
        type: 'operation', key: 'vs', value: 'vs', function: captureVsComparator,
      },
      { type: 'field', value: 'b', field: 'letter' },
    ]
    expect(() => captureVsComparator(1, A)).toThrow()
  })
  it('throws when you use a comparison field outside of the comparison', () => {
    const A = [ // `vs 2 vs 3 ..`
      { type: 'field', value: '1', field: 'number' },
      {
        type: 'operation', key: 'vs', value: 'vs', function: captureVsComparator,
      },
      { type: 'field', value: '2', field: 'number' },
      { type: 'field', value: 'b', field: 'letter' },
      { type: 'field', value: '3', field: 'number' },
    ]
    expect(() => captureVsComparator(1, A)).toThrow()
  })
})
