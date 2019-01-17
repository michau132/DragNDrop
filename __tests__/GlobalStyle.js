import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    background-color: #EEEEEE;
  }
  a {
    text-decoration: none;
  }
`;
export default GlobalStyle;
