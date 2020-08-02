import {DefaultTheme, css} from "styled-components";

export type Colors =
  | "background"
  | "foreground"
  | "error"
  | "success"
  | "primary"
  | "secondary";
export type ColorLevel = "light" | "normal" | "dark";

export const lightTheme = {
  background: {
    dark: "#E5E5E5",
    normal: "#EEF0F7",
    light: "#FCFCFC",
  },
  foreground: {
    dark: "#000000",
    normal: "#2B3A4C",
    light: "#475362",
  },
  error: {
    dark: "#F2455A",
    normal: "#F2455A",
    light: "#F75F40",
  },
  success: {
    dark: "#039278",
    normal: "#01B998",
    light: "#5DC53B",
  },
  primary: {
    dark: "#303C9E",
    normal: "#4261CF",
    light: "#8496EB",
  },
  secondary: {
    dark: "#D58019",
    normal: "#F3AB56",
    light: "#F9BD76",
  },
  shadow: "rgba(23,33,113,0.05)",
};

export const darkTheme = {
  ...lightTheme,
  background: lightTheme.foreground,
  foreground: lightTheme.background,
  shadow: "rgba(0,0,0,0.05)",
};


export const SpacingData = {
  xs: "4px",
  sm: "8px",
  md: "14px",
  lg: "16px",
  xl: "24px",
  xxl: "32px",
};

export const Shadow = {
  short: css`
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04), 0 2px 2px rgba(0, 0, 0, 0.06),
      0 4px 4px rgba(0, 0, 0, 0.1), 0 8px 8px rgba(0, 0, 0, 0.12);
  `,
  long: css`
    box-shadow: 0 1px 1px ${({theme}) => theme.colors.shadow}, 0 2px 2px ${({theme}) => theme.colors.shadow},
      0 4px 4px ${({theme}) => theme.colors.shadow}, 0 8px 8px ${({theme}) => theme.colors.shadow},
      0 16px 16px ${({theme}) => theme.colors.shadow}, 0 32px 32px ${({theme}) => theme.colors.shadow};
  `,
};


export type ColorTypes = typeof lightTheme;

declare module "styled-components" {
  export interface DefaultTheme {
    themeType: "light" | "dark";
    colors: ColorTypes;
    spacing: typeof SpacingData;
    shadow: typeof Shadow;
  }
}

export const getAlpha = (
  theme: DefaultTheme,
  color: Colors,
  level: ColorLevel = "normal",
  a: number = 1
) => {
  const hex =
    theme.themeType === "light"
      ? lightTheme[color][level]
      : darkTheme[color][level];
  const [r, g, b] = hex.match(/\w\w/g)!.map((x) => parseInt(x, 16));
  return `rgba(${r},${g},${b},${a})`;
};
