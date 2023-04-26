import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  font-weight: 400;
  line-height: 1.5;
}
a {
  text-decoration: none;
  color: inherit;
}

ul, ol {
  list-style: none;
}
`
