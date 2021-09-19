import React, { useContext } from "react";
import { GlobalStyles } from "./styles/global";
import { ThemeProvider } from "styled-components";
import { ThemeContext } from "./context/themeContext";
import { lightTheme, darkTheme } from "./styles/theme";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import NewsFeedPage from "./pages/NewsFeedPage";

function App() {
  const context = useContext(ThemeContext);
  const { theme } = context;

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <>
          <GlobalStyles />
          <Header />

          <Switch>
            <Route exact path="/" component={NewsFeedPage} />
          </Switch>
        </>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
