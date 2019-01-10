
export const takeOperator = (index, tokens) => {
  // collect all the tokens that match whichever one is at index.
  const { key } = tokens[index]
  const takeThese = tokens.filter(t => t.key === key)
  const theOtherTokens = tokens.filter(t => t.key !== key)
  return [takeThese, theOtherTokens]
}

export const captureVsComparator = (index, tokens) => {
  // look
  if (index === 0) throw Error(`the ${tokens[index].operation} operator requires a left side`)
  let i = index
  let t = tokens[i]

  const iP = i - 1
  const tP = tokens[iP]

  if (t.type === 'operator' && tP.type === 'operator') throw Error('cannot have adjacent vs operators')

  let iN = i + 1
  let tN = tokens[iN]
  let captured = false

  let comparisonTokens = [tP]
  while (!captured) {
    comparisonTokens.push(t)
    if ((tN !== undefined && tN.type === 'operator') && t.type === 'operator') throw Error('cannot have adjacent vs operators')
    if ((tN === undefined || tN.type === 'field') && t.type === 'field') {
      captured = true
    } else {
      i += 1
      iN += 1
      t = tokens[i]
      tN = tokens[iN]
    }
  }
  comparisonTokens = comparisonTokens.filter(token => token.type !== 'operation')
  // if the comparison tokens contain multiple fields, throw an error.
  const comparisonTokenFields = [...new Set(comparisonTokens.map(ti => ti.field))]
  if (comparisonTokenFields.length > 1) throw Error(`can't compare multiple tokens: ${comparisonTokenFields}`)
  // there should only be one field type in this comparison token set.
  const restOfTokens = [...tokens.slice(0, index - 1), ...tokens.slice(iN, tokens.length)]
  const otherTokenFields = [...new Set(restOfTokens.map(ti => ti.key || ti.field))]
  if (otherTokenFields.includes(comparisonTokenFields[0])) throw Error('can\'t include comparison field outside of comparison')

  return [comparisonTokens, restOfTokens]
}

