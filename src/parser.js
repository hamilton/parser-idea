import { takeOperator } from './operator'
import { tokenize } from './tokenize'

export const getNextOperation = tokens => tokens.map((v, i) => [Object.assign({}, v), i]).filter(vi => vi[0].type === 'operation')[0]

export default (str, grammar) => {
  const tokens = tokenize(str, grammar)
  const instructions = []

  let tokenSetForInstructions = tokens.map(t => t).filter(t => t.type === 'operation' || t.type === 'field')
  while (tokenSetForInstructions.filter(t => t.type === 'operation').length) {
    const [operator, index] = getNextOperation(tokenSetForInstructions) // gives [token, index]
    const [operationArguments, restOfTokens] = operator.function(index, tokenSetForInstructions)
    const operation = {
      operation: operator.key,
      key: operationArguments[0].key,
      values: operationArguments.map(t => t.value),
    }
    instructions.push(operation)
    tokenSetForInstructions = restOfTokens
  }
  while (tokenSetForInstructions.length) {
    const [takeset, otherTokens] = takeOperator(0, tokenSetForInstructions)
    const operation = {
      operation: 'take',
      key: takeset[0].key,
      values: takeset.map(t => t.value),
    }
    instructions.push(operation)
    tokenSetForInstructions = otherTokens
  }
  const unmatchedTokens = tokens.filter(t => t.type === undefined)
  return {
    instructions, original: str, tokens, unmatchedTokens,
  }
}
