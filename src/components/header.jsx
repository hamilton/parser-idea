import React from 'react'
import styled from 'styled-components'

const HeaderContainer = styled.h1`
text-align:center;
color: white;
grid-column: screen / screen;
margin:0;
padding:0;
font-size: 30px;
font-weight: 900;
text-align:center;
text-transform: uppercase;
background: #AA076B;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #61045F, #AA076B);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #61045F, #AA076B); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

display: grid;
grid-template-columns: 1fr 1fr 1fr;
margin:auto;
margin-bottom: 50px;
padding:15px;

`

const Main = styled.div`
text-shadow: 
1px 1px 0px #d02000,
2px 2px  0px #d02000,
3px 3px  0px #d02000,
4px 4px  0px #d02000;
`

const Tagline = styled.div`
font-size:18px;
font-weight: 300;
margin:auto;
text-align:right;
padding-right:20px;
font-style:italic;
text-transform: none;
font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
`

export default () => (
  <HeaderContainer>
    <div />
    <Main>Product Metrics Explorer</Main>
    <Tagline />
  </HeaderContainer>
)
