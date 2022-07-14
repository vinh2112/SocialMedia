import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import handleToast from "components/Toast/HandleToast";
import { socket, SocketContext } from "context/socketContext";
import AdminPage from "pages/AdminPage";
import EditProfilePage from "pages/EditProfilePage";
import MessengerPage from "pages/MessengerPage";
import NotFoundPage from "pages/NotFoundPage";
import CheckoutPay from "pages/CheckoutPage";
import ProfilePage from "pages/ProfilePage";
import SearchPage from "pages/SearchPage";
import SignupPage from "pages/SignupPage";
import LoginPage from "pages/LoginPage";
import ViewPostPage from "pages/ViewPostPage";
import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { toastState$ } from "redux/selectors";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import Toast from "./components/Toast";
import { ThemeContext } from "./context/themeContext";
import NewsFeedPage from "./pages/NewsFeedPage";
import { GlobalStyles } from "./styles/global";
import { darkTheme, lightTheme } from "./styles/theme";
import SimpleBarReact from "simplebar-react";
import ScrollToTop from "components/ScrollToTop";
import PayPage from "pages/PayPage";

const muiDarkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const muiLightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  const [showScrollTop, setShowScrollTop] = React.useState(false);
  const context = useContext(ThemeContext);
  const { theme } = context;
  const toast = useSelector(toastState$);
  const scrollRef = React.useRef();

  useEffect(() => {
    if (toast.message !== "") {
      handleToast(toast);
    }
  }, [toast]);

  useEffect(() => {
    const showScrollToTop = () => {
      if (scrollRef.current.getScrollElement().scrollTop > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    scrollRef.current.getScrollElement().addEventListener("scroll", showScrollToTop);
  }, []);

  const scrollToTop = () => {
    scrollRef.current.getScrollElement().scrollTop = 0;
  };

  return (
    <SimpleBarReact style={{ height: "100vh" }} scrollableNodeProps={{ id: "scroll-node" }} ref={scrollRef}>
      <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
        <BrowserRouter>
          <MuiThemeProvider theme={theme === "light" ? muiLightTheme : muiDarkTheme}>
            <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
              <SocketContext.Provider value={socket}>
                <GlobalStyles />

                <Switch>
                  <Route exact path="/" component={NewsFeedPage} />
                  <Route path="/login" component={LoginPage} />
                  <Route path="/register" component={SignupPage} />
                  <Route path="/search" component={SearchPage} />
                  <Route path="/setting" component={EditProfilePage} />
                  <Redirect from="/detail/" to="/" exact />
                  <Route path="/profile/:userId" component={ProfilePage} />
                  <Route path="/checkout/:postId" component={CheckoutPay} />
                  <Route path="/pay" component={PayPage} />
                  <Route path="/administrator" component={AdminPage} />
                  <Route path="/messages" component={MessengerPage} />
                  <Route path="/post/:id" component={ViewPostPage} />
                  <Route path="*" component={NotFoundPage} />
                  <Redirect to="/" />
                </Switch>

                {showScrollTop && <ScrollToTop scrollToTop={scrollToTop} />}
                <Toast />
              </SocketContext.Provider>
            </ThemeProvider>
          </MuiThemeProvider>
        </BrowserRouter>
      </PayPalScriptProvider>
    </SimpleBarReact>
  );
}

export default App;
