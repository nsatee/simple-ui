import styled, {css} from "styled-components";
import {Colors, lightTheme, getAlpha} from "../../Theme";

type ButtonType = {
  colorType?: Colors;
  buttonType?: "normal" | "ghost" | "border";
  sizeType?: "xs" | "sm" | "md" | "lg" | "xl";
};

const handleButtonType = ({
                            colorType = "primary",
                            buttonType,
                          }: ButtonType) => {
  switch (buttonType) {
    case "border":
      return css`
        background-color: transparent;
        border: 2px solid
          ${({theme}) =>
        colorType
          ? theme.colors[colorType].normal
          : theme.colors.primary.normal};
        color: ${({theme}) =>
        colorType
          ? theme.colors[colorType].normal
          : theme.colors.primary.normal};

        &:hover {
          color: ${({theme}) =>
        colorType === "foreground"
          ? theme.colors.background.light
          : lightTheme.background.light};
          background-color: ${({theme}) =>
        colorType
          ? theme.colors[colorType].normal
          : theme.colors.primary.normal};
          border: 2px solid
            ${({theme}) =>
        colorType
          ? theme.colors[colorType].normal
          : theme.colors.primary.normal};
          ${({theme}) => theme.shadow.long}
        }

        &:active {
          transition: 0.05s;
          background-color: ${({theme}) =>
        colorType
          ? theme.colors[colorType].dark
          : theme.colors.primary.dark};
          border: 2px solid
            ${({theme}) =>
        colorType
          ? theme.colors[colorType].dark
          : theme.colors.primary.dark};
        }
      `;
    case "ghost":
      return css`
        background-color: transparent;
        border: 2px solid transparent;
        color: ${({theme}) =>
        colorType
          ? theme.colors[colorType].normal
          : theme.colors.primary.normal};

        &:hover {
          color: ${({theme}) =>
        colorType
          ? theme.colors[colorType].normal
          : theme.colors.primary.normal};
          background-color: ${({theme}) =>
        getAlpha(theme, colorType, "normal", 0.2)};
          border: 2px solid
            ${({theme}) => getAlpha(theme, colorType, "normal", 0.4)};
        }
      `;
    default:
      return css`
        background-color: ${({theme}) =>
        colorType
          ? theme.colors[colorType].normal
          : theme.colors.primary.normal};
        border: 2px solid
          ${({theme}) =>
        colorType
          ? theme.colors[colorType].normal
          : theme.colors.primary.normal};

        color: ${({theme}) =>
        colorType === "foreground"
          ? theme.colors.background.light
          : lightTheme.background.light};

        &:hover {
          background-color: ${({theme}) =>
        colorType
          ? theme.colors[colorType].light
          : theme.colors.primary.light};
          border: 2px solid
            ${({theme}) =>
        colorType
          ? theme.colors[colorType].light
          : theme.colors.primary.light};
          ${({theme}) => theme.shadow.long}
        }

        &:active {
          transition: 0.05s;
          background-color: ${({theme}) =>
        colorType
          ? theme.colors[colorType].normal
          : theme.colors.primary.dark};
          border: 2px solid
            ${({theme}) =>
        colorType
          ? theme.colors[colorType].dark
          : theme.colors.primary.dark};
        }
      `;
  }
};

export const Button = styled.button<ButtonType>`
  display: flex;
  padding: ${({theme, sizeType = "md"}) =>
  `${theme.spacing[sizeType]} calc(${theme.spacing[sizeType]} * 2)`};
  font-weight: bold;
  font-size: 16px;
  color: ${({theme, colorType}) =>
  colorType === "foreground"
    ? theme.colors.background.light
    : theme.colors.background.light};
  cursor: pointer;
  transition: 0.1s;
  outline: 0;
  border-radius: 4px;
  ${(props) => handleButtonType(props)}
`;
