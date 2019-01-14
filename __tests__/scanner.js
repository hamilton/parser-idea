import scan from '../src/scanner'
import { PRODUCT_DASHBOARD } from './test-grammars'
import { captureVsComparator } from '../src/operator'

describe('scan', () => {
  const scans = [
    {
      in: 'a b c',
      out: [
        { type: 'field', value: 'a', key: 'locale' },
        { type: 'field', value: 'b', key: 'locale' },
        { type: 'field', value: 'c', key: 'locale' },
      ],
    },
    {
      in: 'one two three one two four',
      out: [
        { type: 'field', value: 'one two three', key: 'multiword' },
        { type: 'field', value: 'one two four', key: 'multiword' },
      ],
    },
    {
      in: 'one BREAK one two four',
      out: [
        { type: 'field', value: 'one', key: 'multiword' },
        { type: undefined, value: 'BREAK' },
        { type: 'field', value: 'one two four', key: 'multiword' },
      ],
    },
    {
      in: 'one two four BREAK one two four',
      out: [
        { type: 'field', value: 'one two four', key: 'multiword' },
        { type: undefined, value: 'BREAK' },
        { type: 'field', value: 'one two four', key: 'multiword' },
      ],
    },
    {
      in: 'one two four, one two, four',
      out: [
        { type: 'field', value: 'one two four', key: 'multiword' },
        { type: 'field', key: 'multiword', value: 'one' },
        { type: undefined, value: 'two' },
        { type: undefined, value: 'four' },
      ],
    },
    {
      in: 'one two four, one two, four',
      out: [
        { type: 'field', value: 'one two four', key: 'multiword' },
        { type: 'field', key: 'multiword', value: 'one' },
        { type: undefined, value: 'two' },
        { type: undefined, value: 'four' },
      ],
    },
    {
      in: 'one vs one love vs one more time',
      out: [
        { type: 'field', value: 'one', key: 'multiword' },
        {
          type: 'operation', value: 'vs', key: 'compare', function: captureVsComparator,
        },
        { type: 'field', value: 'one love', key: 'multiword' },
        {
          type: 'operation', value: 'vs', key: 'compare', function: captureVsComparator,
        },
        { type: 'field', value: 'one more time', key: 'multiword' },
      ],
    },
    {
      in: 'one, one vs one two four vs one',
      out: [
        { type: 'field', value: 'one', key: 'multiword' },
        // { type: 'field', key: 'multiword', value: 'one love' },
        // { type: 'field', key: 'multiword', value: 'one more time' },
        { type: 'field', value: 'one', key: 'multiword' },
        {
          type: 'operation', key: 'compare', value: 'vs', function: captureVsComparator,
        },
        { type: 'field', key: 'multiword', value: 'one two four' },
        {
          type: 'operation', key: 'compare', value: 'vs', function: captureVsComparator,
        },
        { type: 'field', value: 'one', key: 'multiword' },
      ],
    },
  ]
  it('scans', () => {
    scans.forEach((s) => {
      expect(scan(s.in, PRODUCT_DASHBOARD)).toEqual(s.out)
    })
  })
})
