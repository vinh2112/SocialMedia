import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import App from "./App";
import { ThemeContextProvider } from "./context/themeContext";
import "./index.css";
import reducers from "./redux/reducers";
import mySaga from "./redux/sagas";
import "simplebar/dist/simplebar.min.css";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(mySaga);
// http://localhost:5000
ReactDOM.render(
  <Provider store={store}>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </Provider>,
  document.getElementById("root")
);
