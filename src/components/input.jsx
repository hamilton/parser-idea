import React from 'react'
import styled from 'styled-components'
import { UnControlled as CodeMirrorContainer } from 'react-codemirror2'
import Codemirror from 'codemirror'
import 'codemirror/addon/mode/simple'
import 'codemirror-no-newlines'

import parse from '../parser'
import { captureVsComparator } from '../operator'


const GRAMMAR = {
  options: {
    caseInsensitive: true,
  },
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
      values: ['60', '61', '62', '63'],
    },
    {
      field: 'locale',
      values: ['en-us', 'en-gb', 'en-au'],
    },
    {
      field: 'product',
      values: ['Firefox', 'Chrome', 'Edge', 'Safari', 'Messenger', 'WhatsApp', 'Instagram'],
    },
    {
      field: 'channel',
      values: ['Nightly', 'Beta', 'Release', 'Developer Edition'],
    },
    {
      field: 'geo',
      values: ['US', 'DK', 'FR', 'AU', 'GB'],
    },
    {
      field: 'metric',
      values: ['downloads', 'retention', 'MAUs', 'crashes', 'rating'],
    },
  ],
}

const createHighlighter = (grammar) => {
  const rules = grammar.fields.map(f => ({ regex: new RegExp(f.values.join('|'), 'i'), token: f.field }))
  return {
    start: [
      { regex: /,/, token: 'ignore' },
      { regex: /(and)/, token: 'ignore' },
      { regex: /(vs\.|vs)/i, token: 'ignore' },
      ...rules,
      { regex: /\s/, token: 'whitespace' },
      { regex: /.*?\s/, token: 'candidate' },
    ],
  }
}

const createStyle = field => `
.cm-${field} {
  border-bottom: 2px solid darkgray;
  text-decoration: none;
}

.cm-${field}:before {
  color: darkgray;
  font-weight:100;
  content: "${field}";
  position: absolute;
  font-size:12px;
  transform: translate(0px, -12px);
}

`


Codemirror.defineSimpleMode('input', createHighlighter(GRAMMAR))


const mozParser = str => parse(str, GRAMMAR)

export const BigOlTitle = styled.h1`
font-size: 70px;
font-weight: 900;
text-align:center;
color: purple;
text-transform: uppercase;`

export const InputContainer = styled.div`

.CodeMirror {
  height: auto;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  background-color: #fbeaff;
  font-size: 35px;
  padding: 20px;
  border: 6px solid #845ec2;
  width: 80vw;
  display: block;
  margin: auto;
  margin-top:50px;
  border-radius: 16px;
  box-shadow: 
    8px 8px 0px #d65db1,
    16px 16px 0px #ff9671,
    24px 24px 0px #ffc75f,
    32px 32px 0px #f9f871;
  color: tomato;
  font-weight: 900;
}

.CodeMirror-lines {
  padding: 20px;
}

.CodeMirror .cm-ignore {
  color: gray;
  font-weight: 100;
}

${GRAMMAR.fields.map(f => createStyle(f.field))}

.cm-candidate {
  text-decoration: line-through;
  opacity: .5;
  font-weight: normal;
}

:focus {
    animation: PulseAttention .75s cubic-bezier(.215, .61, .355, 1) forwards infinite;
}

@keyframes PulseAttention {
    50% {
      border: 6px solid purple;
        box-shadow: 
  8px 8px 0px #845ec2,
  16px 16px 0px #d65db1,
  24px 24px 0px #ff9671,
  32px 32px 0px #ffc75f;
    }
}
`

export const InputField = styled.input`
`

const OutputGroup = styled.div`
display: flex;
color: tomato;
border: 4px solid orange;
border-radius: 12px;
align-items: baseline;
padding: 4px;
`

const OutputContainer = styled.div`
display: flex;
width: 80vw;
margin:auto;
margin-top:438px;
padding-left: 40px;

${OutputGroup} {
  margin-left: 2px;
  margin-right: 2px;
}

${OutputGroup}:first-child {
  margin-left:0px;
}

${OutputGroup}:last-child {
  margin-right:0px;
}
`

const OutputField = styled.div`
font-weight: 300;
padding: 10px;
`

const OutputValue = styled.div`
font-weight: 900;
border: 3px solid tomato;
background-color: #FFEFD5;
border-radius: 7px;
padding: 10px;
margin-left:  2px;
margin-right: 2px;
`

export default class ParsingInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { output: {}, value: '' }
    this.onChange = this.onChange.bind(this)
  }

  onChange(editor, data, value) {
    let output
    if (value !== '') {
      try {
        output = mozParser(value)
      } catch (err) {
        // console.error(err)
      }
    } else {
      output = []
    }
    if (!output) output = {}
    this.setState({ output, value })
  }

  render() {
    return (
      <React.Fragment>
        <BigOlTitle>Product Metrics Explorer</BigOlTitle>
        <InputContainer>
          <CodeMirrorContainer
            value={this.state.value}
            options={{
              mode: 'input',
              theme: 'default',
              noNewlines: true,
            }}
            onChange={this.onChange}
          />
        </InputContainer>
        <OutputContainer>
          {this.state.output.instructions && this.state.output.instructions.map(o => <OutputGroup key={`group-${o.key}`}><OutputField key={o.key}>{o.key}</OutputField>{o.values.map(oo => <OutputValue key={oo}>{oo}</OutputValue>)}</OutputGroup>)}
        </OutputContainer>
      </React.Fragment>
    )
  }
}

//
