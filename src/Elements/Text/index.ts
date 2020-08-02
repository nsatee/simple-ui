import styled, {css} from 'styled-components';

const fontStyle = (as?: "h1" | "h2" | "h3" | "h4") => {
  switch (as) {
    case "h1":
      return css`
        font-size: 30px;
         line-height: 40px;
         margin: 0;
      `
    case "h2":
      return css`
        font-size: 24px;
        line-height: 30px;
      `
    case "h3":
      return css`
        font-size: 18px;
        line-height: 25px;
`
    case "h4":
      return css`
        font-size: 14px;
        line-height: 20px;
`
  }
}

const Text = styled.span<{as?: "h1" | "h2" | "h3" | "h4"}>`
  font-weight: bold;
  ${({as}) => fontStyle(as)}
`;

export default Text;