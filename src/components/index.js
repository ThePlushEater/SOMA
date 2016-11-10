import "babel-polyfill";

import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { connect } from "react-redux";

import store from "./../store/store";

import App from "./app/app.component";

require('./index.scss');

ReactDom.render(<Provider store={store}>
    <App />
  </Provider>
, document.querySelector('#app'));
