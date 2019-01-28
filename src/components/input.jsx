import React from 'react'
import styled from 'styled-components'
import { UnControlled as CodeMirrorContainer } from 'react-codemirror2'
import Codemirror from 'codemirror'
import 'codemirror/addon/mode/simple'
import 'codemirror/addon/display/placeholder'
import 'codemirror-no-newlines'

import parse from '../parser'
import { captureVsComparator } from '../operator'

import Help from './help'
import ParsedOutput from './parsed-output'

const MAIN = '#AA076B';

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
    {
      operation: 'vs.',
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
      values: ['Firefox', 'Focus', 'Chrome', 'Edge', 'Safari', 'Messenger', 'WhatsApp', 'Instagram', 'Twitter', 'Facebook'],
    },
    {
      field: 'channel',
      values: ['Nightly', 'Beta', 'Release', 'Developer Edition'],
    },
    {
      field: 'geo',
      values: ['US', 'DK', 'FR', 'AU', 'GB', 'IN', 'ID'],
    },
    {
      field: 'metric',
      values: ['downloads', 'retention', 'MAUs', 'crashes', 'rating'],
    },
  ],
  examples: [
    'Firefox nightly 62, US vs. GB, crashes',
    'Messenger vs. WhatsApp vs Instagram, downloads, rating, US',
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

export const InputContainer = styled.div`
grid-column: page-start / page-end;
transition: 100ms;
.CodeMirror {
  height: auto;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  background-color: #fbeaff;
  font-size: 35px;
  padding: 20px;
  border: 6px solid ${MAIN};
  display: block;
  margin: auto;
  margin-top:50px;
  border-radius: 16px;
  color: tomato;
  font-weight: 900;
}

.CodeMirror-scroll {
  overflow: auto !important;
  border-right-width:0 !important;
  border-bottom-width:0 !important;
}

pre.CodeMirror-placeholder {
  color: gainsboro;
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

.CodeMirror {
  transition:100ms;
}

.CodeMirror-focused {
  box-shadow: 
    8px 8px 0px #ce0280,
    16px 16px 0px #ff9671,
    24px 24px 0px #ffc75f,
    32px 32px 0px #f9f871;
}

@keyframes PulseAttention {
    50% {
      border: 6px solid purple;
        box-shadow: 
  8px 8px 0px ${MAIN},
  16px 16px 0px #ce0280,
  24px 24px 0px #ff9671,
  32px 32px 0px #ffc75f;
    }
}
`


const HelpButton = styled.button`
grid-column: kicker-start / kicker-end;
padding:20px;
background-color: #fbeaff;
border: 3px solid ${MAIN};
border-radius: 5px;
color: ${MAIN};
font-weight: 900;
text-transform: uppercase;
font-size: 12px; 
transition: 100ms;

:hover {
  cursor: pointer;
  background-color: rgba(250, 170, 250, 1);
  box-shadow: 
    4px 4px 0px #d65db1,
    8px 8px 0px #ff9671,
    12px 12px 0px #ffc75f,
    16px 16px 0px #f9f871;
}
:active {
  cursor: pointer;
  background-color: rgba(200, 120, 200, 1);
  box-shadow:
    2px 2px 0px  #61045F;
}

`

const LeftCaveat = styled.div`
grid-column: screen / page-start;
grid-row-start:1;
grid-row-end:3;
div {
  padding: 20px;
  font-weight:900;
  text-transform:uppercase;
  color: black;
    text-align:left;
  writing-mode: vertical-rl;
  text-orientation: upright;
  letter-spacing:-3px;
  border-bottom-right-radius:20px;
  border-top-right-radius:20px;
  border: 3px solid ${MAIN};
  border-left: none;
  opacity:.6;
  box-shadow: 
    0px 4px 0px #ce0280,
    0px 8px 0px #ff9671,
    0px 12px 0px #ffc75f,
    0px 16px 0px #f9f871;
}
`

const OutputContainer = styled.div`
min-height: 100px;
grid-column: page;

`

export default class ParsingInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { output: {}, value: '', showHelp: false }
    this.onChange = this.onChange.bind(this)
    this.toggleHelp = this.toggleHelp.bind(this)
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
    if (!output) output = this.state.output //eslint-disable-line
    this.setState({ output, value })
  }

  toggleHelp() {
    const { showHelp } = this.state
    this.setState({ showHelp: !showHelp })
    console.log(showHelp, !showHelp)
  }

  render() {
    const { showHelp } = this.state
    return (
      <React.Fragment>
        <LeftCaveat><div>Prototype</div></LeftCaveat>
        <HelpButton onClick={this.toggleHelp}>{showHelp ? 'Hide' : 'Show'} Help / fields </HelpButton>
        <InputContainer>
          <CodeMirrorContainer
            value={this.state.value}
            options={{
              mode: 'input',
              theme: 'default',
              noNewlines: true,
              placeholder: GRAMMAR.examples[0],
            }}
            onChange={this.onChange}
          />
        </InputContainer>
        <OutputContainer>
          {
          (Object.keys(this.state.output).length) ? (
            <ParsedOutput output={this.state.output} />
          ) :
          undefined
        }
        </OutputContainer>
        {showHelp ? <Help visible={showHelp} grammar={GRAMMAR} /> : undefined}


      </React.Fragment>
    )
  }
}

//
