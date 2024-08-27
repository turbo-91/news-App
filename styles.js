import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    font-family: Helvetica, Arial;
  }

  body {
    margin: 0;
    
  }
`;
