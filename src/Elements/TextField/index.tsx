import styled from "styled-components";
import {getAlpha} from "../../Theme";

export const TextField = styled.input<{ value: string }>`
  padding: 10px 8px;
  border: 2px solid
    ${({theme}) => getAlpha(theme, "foreground", "normal", 0.2)};
  outline: 0;
  transition: 0.1s;
  background-color: ${({theme}) => theme.colors.background.light};
  border-radius: ${({theme}) => theme.spacing.sm};

  &:hover {
    border: 2px solid
      ${({theme}) => getAlpha(theme, "foreground", "normal", 0.4)};
  }

  &:focus,
  &:not([value=""]) {
    border: 2px solid
      ${({theme}) => getAlpha(theme, "foreground", "normal", 1)};
  }
`;
