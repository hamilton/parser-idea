import React from 'react'
import styled from 'styled-components'

const OutputGroup = styled.div`
display: flex;
color: ${props => (props.unmatched ? 'gray' : 'tomato')};
border: 4px solid ${props => (props.unmatched ? 'gray' : 'orange')};
opacity: ${props => (props.unmatched ? 0.5 : 1)};
border-radius: 12px;
align-items: baseline;
padding: 4px;
margin-bottom:4px;
`

const OutputContainer = styled.div`
grid-column: page;
display: flex;
flex-wrap: wrap;
margin:auto;
margin-top:38px;
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

const OutputOperator = styled.div`
padding:10px;
font-weight:900;
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

export default ({ output }) => (
  <OutputContainer>
    {output.instructions && output.instructions.map(o => (
      <OutputGroup key={`group-${o.key}`}>
        <OutputOperator key={`operator-${o.operation}`}>{o.operation}</OutputOperator>
        <OutputField key={o.key}>{o.key}</OutputField>
        {o.values.map(oo => <OutputValue key={oo}>{oo}</OutputValue>)}
      </OutputGroup>))
            }
    {output.unmatchedTokens.length ?
      <OutputGroup unmatched><OutputField>unmatched</OutputField>
        {output.unmatchedTokens.map(o =>
          <OutputValue key={o.value}>{o.value}</OutputValue>)}
      </OutputGroup> : undefined}
  </OutputContainer>
)
