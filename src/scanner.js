export const noMatch = value => ({ type: undefined, value })

export default (str, grammar) => {
  const sortedFields = []
  grammar.fields.forEach((f) => {
    const { values, field } = f
    values.sort((a, b) => {
      if (b.length < a.length) return -1
      if (b.length > a.length) return 1
      return 0
    })

    sortedFields.push({ field, values })
  })
  const lexemes = []

  const substrings = str.split(',').map(s => s.trim())

  substrings.forEach((substring) => {
    let inputStr = substring
    let c = 0
    while (inputStr.length && c < 10) {
      c += 1
      let stop = false
      /* eslint-disable no-loop-func */
      sortedFields.forEach((f) => {
        if (!stop) {
          const { values, field } = f
          const match = values.filter(v => inputStr.startsWith(v))[0]
          if (match) {
            stop = true
            lexemes.push({ key: field, value: match, type: 'field' })
            inputStr = inputStr.slice(match.length).trim()
          }
        }
      })
      if (!stop) {
        grammar.operations.forEach((o) => {
          if (stop) return
          const { operation, key } = o
          const fcn = o.function
          const match = inputStr.startsWith(operation)
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
