import { takeOperator } from './operator'
import scan from './scanner'

/*
SumLang v0.2 - a very simple grammar for making a chart

fields & operations -> Lexical Parser (scan)
operations -> Syntactical Parser (parse) // BOTTOM-UP SHIFT-REDUCE LR(1), BABY (?)


scan(string) -> tokenset


(1) LEXICAL: scanning -> break chars and eat one char at a time.
  - Longest match wins approach. This allows for multi-word strings.
  - Should pass tests the exact same way.
(2) SYNTACTICAL: parsing -> implement an LL(1) parser for this purpose.
(3) SEMANTIC: is the collections of statements in the program correct?
(4) IR: transform to small set of IRs.

*/

export const getNextOperation = tokens => tokens.map((v, i) => [Object.assign({}, v), i]).filter(vi => vi[0].type === 'operation')[0]

export default (str, grammar) => {
  const tokens = scan(str, grammar)// tokenize(str, grammar)
  const instructions = []

  let tokenSetForInstructions = tokens.map(t => t).filter(t => t.type === 'operation' || t.type === 'field')
  while (tokenSetForInstructions.filter(t => t.type === 'operation').length) {
    const [operator, index] = getNextOperation(tokenSetForInstructions) // gives [token, index]
    const [operationArguments, restOfTokens, errors] =
      operator.function(index, tokenSetForInstructions)
    if (errors) console.log(errors)
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
