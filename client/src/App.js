import React, { useContext, useEffect } from "react";
import { GlobalStyles } from "./styles/global";
import { ThemeProvider } from "styled-components";
import { ThemeContext } from "./context/themeContext";
import { lightTheme, darkTheme } from "./styles/theme";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import NewsFeedPage from "./pages/NewsFeedPage";
import NotFoundPage from "pages/NotFoundPage";
import ProfilePage from "pages/ProfilePage";
import PaypalPage from "pages/PaypalPage";
import Toast from "./components/Toast";
import { useSelector } from "react-redux";
import { toastState$ } from "redux/selectors";
import handleToast from "components/Toast/HandleToast";
import SearchPage from "pages/SearchPage";
import Home from "pages/HomePage";
import SignupPage from "pages/SignupPage";
import EditProfilePage from "pages/EditProfilePage";
import AdminPage from "pages/AdminPage";

function App() {
  const context = useContext(ThemeContext);
  const { theme } = context;

  const toast = useSelector(toastState$);

  useEffect(() => {
    if (toast.message !== "") {
      handleToast(toast);
    }
  }, [toast]);

  const handleLoggedIn = () => {
    const TOKEN = localStorage.getItem("access_token");
    if (TOKEN) return true;
    return false;
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <>
          <GlobalStyles />

          <Switch>
            <Route exact path="/" component={NewsFeedPage} />
            <Route path="/home" component={Home} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/search" component={SearchPage} />
            <Route path="/login">{handleLoggedIn() ? <Redirect to="/" /> : <NotFoundPage />}</Route>
            <Route path="/setting" component={EditProfilePage} />
            <Redirect from="/detail/" to="/" exact />
            <Route path="/profile/:userId" component={ProfilePage} />
            <Route path="/checkout" component={PaypalPage} />
            <Route path="/administrator" component={AdminPage} />
            <Route path="*" component={NotFoundPage} />
            <Redirect to="/" />
          </Switch>

          <Toast />
        </>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
