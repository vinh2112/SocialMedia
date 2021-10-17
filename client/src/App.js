import React, { useContext, useEffect } from "react";
import { GlobalStyles } from "./styles/global";
import { ThemeProvider } from "styled-components";
import { ThemeContext } from "./context/themeContext";
import { lightTheme, darkTheme } from "./styles/theme";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import NewsFeedPage from "./pages/NewsFeedPage";
import NotFoundPage from "pages/NotFoundPage";
import ProfilePage from "pages/ProfilePage";
import Toast from "./components/Toast";
import { useSelector } from "react-redux";
import { toastState$ } from "redux/selectors";
import handleToast from "components/Toast/HandleToast";

function App() {
  const context = useContext(ThemeContext);
  const { theme } = context;

  const toast = useSelector(toastState$);

  useEffect(() => {
    if (toast.message !== "") {
      handleToast(toast);
    }
  }, [toast]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <>
          <GlobalStyles />
          <Header />

          <Switch>
            <Route exact path="/" component={NewsFeedPage} />
            <Route exact path="/:userId" component={ProfilePage} />
            <Route component={NotFoundPage} />
          </Switch>

          <Toast />
        </>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
