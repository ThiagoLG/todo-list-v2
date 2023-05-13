import { createGlobalStyle } from 'styled-components'
import { defaultTheme } from './themes/default'

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

::-webkit-scrollbar {
    width: 0.5rem;
    background-color: ${defaultTheme['gray-200']}
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: ${defaultTheme['gray-500']};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${defaultTheme['gray-300']};
  }
`
