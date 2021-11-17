import React, { useContext, useEffect,useState } from "react";
import { GlobalStyles } from "./styles/global";
import { ThemeProvider } from "styled-components";
import { ThemeContext } from "./context/themeContext";
import { lightTheme, darkTheme } from "./styles/theme";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
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

function App() {
  const context = useContext(ThemeContext);
  const { theme } = context;

  const toast = useSelector(toastState$);
  const [isOpen, setOpen] = useState(false);
    const toggle = () => {
      setOpen(!isOpen);
      console.log(isOpen);
    };

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
          <Header toggle={toggle}/>

          <Switch>
            <Route exact path="/" component={NewsFeedPage} />
            {/* <Route path="/search" component={SearchPage} />
            <Route path="/profile/:userId" component={ProfilePage} />
            <Route path="/checkout" component={PaypalPage} />
            <Route path="*" component={NotFoundPage} /> */}
            <Route path="/Home" component={Home} toggle={toggle} isOpen={isOpen}/>
            <Route path="/signup" component={SignupPage}/>
          </Switch>

          <Toast />
        </>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
