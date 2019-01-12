import { takeOperator } from './operator'

function removePunctuation(c) {
  return c.replace(/[^A-Za-z0-9_]/g, '');
}
const compareCaseSensitiveString = (s, grammar) => {
  if (grammar.options && Boolean(grammar.options.caseInsensitive)) return s.toLowerCase()
  return s
}

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
    return { type: undefined, value: v }
  }
  return matches[0]
} // locateField takes a string and converts it to a {field: f, value: transformedString}

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
    return { type: undefined, value: v }
  }
  return matches[0]
}

export const tagToken = (v, grammar) => {
  let token = locateField(v, grammar)
  if (token.type === undefined) token = locateOperation(v, grammar)
  if (token.type === undefined) throw Error(`token ${v} is neither field nor operation`)
  return token
}

export const getNextOperation = tokens => tokens.map((v, i) => [Object.assign({}, v), i]).filter(vi => vi[0].type === 'operation')[0]

export default (str, grammar) => {
  let tokens = str.split(/[(and) ,]+/)
    .filter(s => s.length)
    .map(v => tagToken(v, grammar))
  const instructions = []
  while (tokens.filter(t => t.type === 'operation').length) {
    const [operator, index] = getNextOperation(tokens) // gives [token, index]
    const [operationArguments, restOfTokens] = operator.function(index, tokens)
    const operation = {
      operation: operator.key,
      key: operationArguments[0].key,
      values: operationArguments.map(t => t.value),
    }
    instructions.push(operation)
    tokens = restOfTokens
  }
  while (tokens.length) {
    const [takeset, otherTokens] = takeOperator(0, tokens)
    const operation = {
      operation: 'take',
      key: takeset[0].key,
      values: takeset.map(t => t.value),
    }
    instructions.push(operation)
    tokens = otherTokens
  }
  return instructions
}
