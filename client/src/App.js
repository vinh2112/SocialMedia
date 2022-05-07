import React, { useContext, useEffect } from "react";
import { GlobalStyles } from "./styles/global";
import { ThemeProvider } from "styled-components";
import { ThemeContext } from "./context/themeContext";
import { socket, SocketContext } from "context/socketContext";
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
import MessengerPage from "pages/MessengerPage";
import ViewPostPage from "pages/ViewPostPage";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

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
    <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
      <BrowserRouter>
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
          <SocketContext.Provider value={socket}>
            <GlobalStyles />

            <Switch>
              <Route exact path="/" component={NewsFeedPage} />
              <Route path="/home" component={Home} />
              <Route path="/signup" component={SignupPage} />
              <Route path="/search" component={SearchPage} />
              <Route path="/login">
                {handleLoggedIn() ? <Redirect to="/" /> : <NotFoundPage />}
              </Route>
              <Route path="/setting" component={EditProfilePage} />
              <Redirect from="/detail/" to="/" exact />
              <Route path="/profile/:userId" component={ProfilePage} />
              <Route path="/checkout/:postId" component={PaypalPage} />
              <Route path="/administrator" component={AdminPage} />
              <Route path="/messages" component={MessengerPage} />
              <Route path="/post/:id" component={ViewPostPage} />
              <Route path="*" component={NotFoundPage} />
              <Redirect to="/" />
            </Switch>

            <Toast />
          </SocketContext.Provider>
        </ThemeProvider>
      </BrowserRouter>
    </PayPalScriptProvider>
  );
}

export default App;
