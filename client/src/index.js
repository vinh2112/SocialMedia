import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import App from "./App";
import { ThemeContextProvider } from "./context/themeContext";
import "./index.css";
import reducers from "./redux/reducers";
import mySaga from "./redux/sagas";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga);

ReactDOM.render(
  <Provider store={store}>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </Provider>,
  document.getElementById("root")
);
