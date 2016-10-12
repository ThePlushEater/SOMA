import React from "react";
import { connect } from "react-redux";

import { fetchLocalization } from "./../../actions/localizationActions";
import { fetchLayout } from "./../../actions/layoutActions";
import store from "./../../store/store";

require('./layout.component.scss');

@connect((store) => {
  return {
    layout: store.layout.layout,
    localization: store.localization.localization,
  }
})
export default class Layout extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchLocalization());
    this.props.dispatch(fetchLayout());
  }
  selectBackground() {
    store.dispatch({type: "SELECT_FRONT", payload: {front: null}});
  }
  render() {
    let divStyle;
    if (this.props.layout && this.props.layout.skybox) {
      divStyle = {
        backgroundColor: this.props.layout.skybox.themeColor,
      }
    }
    return <div className="layout" style={divStyle} onClick={this.selectBackground.bind(this)}>
      <div className="body">
        {this.props.children}
      </div>
    </div>;
  }
}
