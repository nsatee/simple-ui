import React from "react";
import "./App.css";
import CalendarShow from "./pages/CalendarShow";
import {ThemeProvider, DefaultTheme} from "styled-components";
import {lightTheme, darkTheme, SpacingData, Shadow} from "./Theme";
import {GlobalStyle} from "./Theme/GlobalStyle";
import {Helmet} from 'react-helmet'

function App() {
  const themeColor = window.matchMedia("(prefers-color-scheme: dark)");
  const [activeTheme, setActiveTheme] = React.useState<"light" | "dark">(
    themeColor.matches ? "dark" : "light"
  );
  
  const deviceTheme = (event: MediaQueryListEvent) => {
    setActiveTheme(event.matches ? "dark" : "light");
  };
  
  React.useLayoutEffect(() => {
    themeColor.addEventListener("change", deviceTheme);
    return () => {
      themeColor.removeEventListener("change", deviceTheme);
    };
  }, [themeColor]);
  
  const switchTheme = () =>
    activeTheme === "light" ? setActiveTheme("dark") : setActiveTheme("light");
  
  const selectedTheme = React.useMemo<DefaultTheme>(
    () => ({
      themeType: activeTheme,
      colors: activeTheme === "light" ? lightTheme : darkTheme,
      spacing: SpacingData,
      shadow: Shadow,
    }),
    [activeTheme]
  );
  
  return (
    <ThemeProvider theme={selectedTheme}>
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet"/>
      </Helmet>
      <GlobalStyle/>
      <div className="App">
        <button onClick={switchTheme}>switch</button>
        <CalendarShow/>
      </div>
    </ThemeProvider>
  );
}

export default App;
