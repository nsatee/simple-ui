import {createGlobalStyle} from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  body, html {
    font-size: ${({theme}) => theme.spacing.md};
    line-height: 20px;
    background-color: ${({theme}) => theme.colors.background.normal};
    color: ${({theme}) => theme.colors.foreground.normal};
    font-family: 'Inter', sans-serif;
  }
  input, button, textarea {
    font-size: ${({theme}) => theme.spacing.md};
    color: ${({theme}) => theme.colors.foreground.normal};
    font-family: 'Inter', sans-serif;
  }
`;
