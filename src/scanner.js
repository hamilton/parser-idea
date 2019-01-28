export const noMatch = value => ({ type: undefined, value })

export default (str, grammar) => {
  // sort the gammar field values by length, so longest first always wins.
  const sortedFields = [].concat(...grammar.fields.map(f => f.values.map(fi => [f.field, fi])))
  sortedFields.sort((a, b) => {
    if (b[1].length < a[1].length) return -1
    if (b[1].length > a[1].length) return 1
    return 0
  })
  const lexemes = []

  const substrings = str.split(',').map(s => s.trim())

  substrings.forEach((substring) => {
    let inputStr = substring.toLowerCase()
    while (inputStr.length) {
      let stop = false
      /* eslint-disable no-loop-func */
      // look through all the sorted fields, and matches longest string
      // first regardless of field. The longest match should win.
      sortedFields.forEach((f) => {
        if (!stop) {
          const [field, value] = f
          const match = inputStr.startsWith(value.toLowerCase())
          if (match) {
            stop = true
            lexemes.push({ key: field, value, type: 'field' })
            inputStr = inputStr.slice(value.length).trim()
          }
        }
      })
      if (!stop) {
        grammar.operations.forEach((o) => {
          if (stop) return
          const { operation, key } = o
          const fcn = o.function
          const match = inputStr.startsWith(operation.toLowerCase())
          if (match) {
            stop = true
            lexemes.push({
              type: 'operation', value: operation, key, function: fcn,
            })
            inputStr = inputStr.slice(operation.length).trim()
          }
        })
      }
      if (!stop) {
        const brokenUp = inputStr.split(' ')
        inputStr = brokenUp.slice(1).join(' ').trim()
        const s = brokenUp[0].split(',').join('').trim()
        lexemes.push(noMatch(s))
      }
    }
  })
  return lexemes
}
