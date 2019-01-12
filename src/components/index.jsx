import React from 'react'
import ReactDOM from 'react-dom'


import { createGlobalStyle } from 'styled-components'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'

import ParsingInput from './input'

const GlobalStyle = createGlobalStyle`
body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
`

console.log('yeah!!!')
ReactDOM.render(
  <React.Fragment>
    <GlobalStyle />
    <ParsingInput />
  </React.Fragment>,
  document.getElementById('input-container'),
)
