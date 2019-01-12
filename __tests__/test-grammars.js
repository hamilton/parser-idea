// http://www.openculture.com/2015/10/download-original-bauhaus-books-journals-for-free.html
import { captureVsComparator } from '../src/operator'

export const DO_NOTHING = () => {}

export const PRODUCT_DASHBOARD = {
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

