import DEFAULTS from './defaults'

export const noMatch = value => ({ type: undefined, value })

function removePunctuation(c) {
  return c.replace(/[^A-Za-z0-9_]/g, '');
}
const compareCaseSensitiveString = (s, grammar) => {
  if (grammar.options && Boolean(grammar.options.caseInsensitive)) return s.toLowerCase()
  return s
}

export const split = (str, grammar) => str
  .split(grammar.splitBy || DEFAULTS.splitBy)
  .filter(s => s.length)

export const locateField = (v, grammar) => {
  if (typeof v !== 'string') throw Error(`requires a string, instead got ${typeof v}`)
  const matches = grammar.fields.map((f) => {
    if (f.compare) {
      const returnValue = f.compare(v, f.values)
      if (returnValue) return { field: f.field, value: returnValue }
    } else if (f.values.map(fi =>
      compareCaseSensitiveString(fi, grammar)).includes(compareCaseSensitiveString(v, grammar))) {
      return { type: 'field', key: f.field, value: v }
    }
    return undefined
  }).filter(f => f !== undefined)
  if (matches.length > 1) throw Error(`there should only be one match for ${v}`)
  if (matches.length === 0) { // no field matched. Handle elsewhere.
    return noMatch(v)
  }
  return matches[0]
}

export const locateOperation = (v, grammar) => {
  if (typeof v !== 'string') throw Error(`requires a string, instead got ${typeof v}`)
  const vt = removePunctuation(v.toLowerCase())
  const matches = grammar.operations.map((g) => {
    if (g.operation === vt) {
      return {
        type: 'operation', key: g.key, value: vt, function: g.function,
      }
    }
    return undefined
  }).filter(o => o !== undefined)
  if (matches.length > 1) throw Error(`grammar contained more than one match for ${vt}`)
  if (matches.length === 0) {
    return noMatch(v)
  }
  return matches[0]
}

export const locateStopword = (v, grammar) => {
  if (typeof v !== 'string') throw Error(`stopword requires a string, instead got ${typeof v}`)
  const stopwords = grammar.stopwords || DEFAULTS.stopwords
  if (stopwords.includes(v)) return { type: 'stopword', value: v }
  return noMatch(v)
}

export const tagToken = (v, grammar) => {
  let token = locateStopword(v, grammar)
  if (token.type === undefined) token = locateOperation(v, grammar)
  if (token.type === undefined) token = locateField(v, grammar)
  // console.log(token, '?')
  if (token.type === undefined) token = noMatch(v)
  return token
}

export const tokenize = (str, grammar) => split(str, grammar).map(t => tagToken(t, grammar))

