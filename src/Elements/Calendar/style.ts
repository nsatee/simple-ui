import styled from "styled-components";
import {lightTheme, getAlpha} from "../../Theme";

export const Container = styled.div`
  width: 320px;
  background-color: ${({theme}) => theme.colors.background.light};
  border-radius: 8px;
  overflow: hidden;
  ${({theme}) => theme.shadow.long}
`;

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  padding-top: ${({theme}) => theme.spacing.md};
`;

export const ArrowButton = styled.div`
  color: ${({theme}) => theme.colors.primary.normal};
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  cursor: pointer;
`;

export const Wrapper = styled.div`
  padding: ${({theme}) => theme.spacing.lg};
  padding-top: ${({theme}) => theme.spacing.sm};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${({theme}) => theme.colors.primary.normal};
  align-items: center;
`;

export const HeaderSection = styled.section`
  padding: ${({theme}) => theme.spacing.md};
  * {
    color: ${lightTheme.background.light};
    font-weight: bold;
  }
`;

export const Dates = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
`;

export const Days = styled(Dates)`
  grid-template-rows: repeat(1, 1fr);
`;

type DateUIType = {
  current?: boolean;
  outFocus?: boolean;
  selected?: boolean;
};

export const Date = styled.button<DateUIType>`
  width: 40px;
  height: 40px;
  background: ${({current, theme}) =>
  current ? theme.colors.primary.normal : "transparent"};
  color: ${({current}) => (current ? lightTheme.background.light : "auto")};
  font-weight: ${({current}) => (current ? "bold" : "normal")};
  border: 0;
  box-shadow: unset;
  padding: 0;
  display: grid;
  place-items: center;
  outline: 0;
  cursor: pointer;
  position: relative;
  opacity: ${({outFocus}) => (outFocus ? 0.3 : 1)};
  justify-self: center;
  border-radius: 4px;
  overflow: hidden;
  ${({current, theme}) => current && theme.shadow.long}

  &.selected {
    background: ${({theme}) => theme.colors.secondary.normal};
    color: ${lightTheme.background.light};
    font-weight: bold;
    ${({theme}) => theme.shadow.long}

    &::after {
      background: ${({theme}) => theme.colors.secondary.dark};
    }
  }

  &:not(.selected):hover {
    background: ${({theme, current}) =>
  !current && getAlpha(theme, "secondary", "light", 0.2)};
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: ${({theme}) => theme.spacing.xs};
    display: ${({current}) => (current ? "block" : "none")};
    background: ${({theme}) => theme.colors.primary.dark};
  }
`;

export const Day = styled(Date)`
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  cursor: auto;
  background: unset !important;
`;

export const BorderButton = styled.button`
  font-size: 16px;
  background: unset;
  border: 2px solid ${lightTheme.background.light};
  padding: ${({theme}) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  outline: 0;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${lightTheme.background.light};
    color: ${lightTheme.primary.normal};
  }
`;
