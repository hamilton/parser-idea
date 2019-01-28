import React from 'react'
import styled from 'styled-components'
import { Transition } from 'react-spring'


export const HelpContainer = styled.div`
margin:auto;
margin-top:60px;
margin-bottom: 60px;
color: #707C80;
grid-column: page;`

export const HelpSectionHeader = styled.h2``

export const HFieldContainer = styled.div`
display: flex;
flex-wrap: wrap;
align-items: baseline;`
export const HFieldName = styled.div`
font-weight: 900;
padding:10px;`

export const HFieldValue = styled.div`
font-weight: 300;
padding:10px;`

export const HFieldBlock = styled.div`
`

export const Example = styled.div`
font-family: monospace;
margin-top:10px;
margin-bottom: 10px;
`

export default class Help extends React.Component {
  render() {
    const { fields } = this.props.grammar
    return (
      <Transition
        items={this.props.visible}
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
      >
        {show => show && (props =>
          (
            <HelpContainer key="1" style={props}>
              {this.props.grammar.examples &&
              <React.Fragment><HelpSectionHeader>Try These Examples</HelpSectionHeader>
                <HFieldBlock>
                  {this.props.grammar.examples.map(e =>
                    <Example> {'>'} {e}</Example>)}
                </HFieldBlock>
              </React.Fragment>}
              <HelpSectionHeader>Field</HelpSectionHeader>
              <Transition
                items={fields}
                keys={item => item.field}
                trail={25}
                from={{ opacity: 0, color: 'yellow', transform: 'scale(1.1)' }}
                enter={{ opacity: 1, color: 'inherit', transform: 'scale(1)' }}
                leave={{ opacity: 0, color: 'yellow', transform: 'scale(2)' }}
              >
                {f => (fieldProps =>
                  (
                    <HFieldContainer key={f.field} style={fieldProps}>
                      <HFieldName key={f.field}>{f.field}</HFieldName>
                      {f.values.map(fi => <HFieldValue key={`${f.field}-${fi}`}>{fi}</HFieldValue>)}
                    </HFieldContainer>)
                   )
                }
              </Transition>
            </HelpContainer>
          ))
        }
      </Transition>
    )
  }
}
