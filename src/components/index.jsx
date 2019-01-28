import React from 'react'
import ReactDOM from 'react-dom'

import styled, { createGlobalStyle } from 'styled-components'

import 'codemirror/lib/codemirror.css' // eslint-disable-line
import 'codemirror/theme/material.css' // eslint-disable-line

import ParsingInput from './input'
import Header from './header'

const GlobalStyle = createGlobalStyle`
body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    margin:0;
    padding:0;
    min-height: 100vh;
}
`

const PageContainer = styled.div`
margin:0;
display: grid;
width: 100%;
grid-template-columns: 
  [screen-start] 60px 
  [page-start kicker-start] 1fr 
  [middle-start] 60px 
  [text-start kicker-end] 60px 60px 60px 60px 60px 60px 60px 60px 
  [text-end gutter-start] 60px 
  [middle-end] 1fr
  [page-end gutter-end] 60px
  [screen-end];
grid-template-rows: auto;
grid-column-gap: 32px;

@media (max-width: 1180px) {
  grid-template-columns: 
    [screen-start] 1fr 
    [page-start kicker-start] 50px 
    [middle-start] 50px 
    [text-start kicker-end] 50px 50px 50px 50px 50px 50px 50px 50px 
    [text-end gutter-start] 50px 
    [middle-end] 50px 
    [page-end gutter-end] 1fr 
    [screen-end];
  grid-column-gap: 16px;
}

@media (max-width: 808px) {
  grid-template-columns: 1fr;
  display: block;
  font-size:.9rem;
}
`

ReactDOM.render(
  <React.Fragment>
    <GlobalStyle />
    <Header />
    <PageContainer>
      <ParsingInput />
    </PageContainer>
  </React.Fragment>,
  document.getElementById('input-container'),
)
