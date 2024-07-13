import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: Work Sans, sans-serif;
    margin: 0px;
    ::-webkit-scrollbar {
        display: none;
    }
  }
`

export default GlobalStyles