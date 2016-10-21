import "babel-polyfill";

import React from "react";
import ReactDom from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { Provider } from "react-redux";
import { connect } from "react-redux";

import store from "./../store/store";

import Layout from "./layout/layout.component";
import Dashboard from "./dashboard/dashboard.component";

import Parallax from "./parallax/parallax.component";

require('./index.scss');

ReactDom.render(<Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Parallax} />
      </Route>
    </Router>
  </Provider>
, document.querySelector('#app'));
