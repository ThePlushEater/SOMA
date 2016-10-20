import React from "react";
import { connect } from "react-redux";

import { fetchLocalization } from "./../../actions/localizationActions";

import Header from "./../header/header.component";
import ShuffleText from "./../shuffletext/shuffletext.component";

require('./overlay.component.scss');

@connect((store) => {
  return {
    localization: store.localization.localization,
  }
})
export default class Overlay extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
    }
  }
  componentWillMount() {

  }
  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {

  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  componentWillUnmount() {

  }
  toggle() {
    this.setState({
      open: !this.state.open,
    });
  }
  render() {
    let open = "";
    let toggle = this.props.localization.sShowDetail;
    if (this.state.open) {
      open = " open";
      toggle = this.props.localization.sShowMap;
    }
    return <div className={"overlay" + open}>
      OVERLAY
      <button className="toggle" onClick={this.toggle.bind(this)}><ShuffleText text={toggle} /></button>
    </div>;
  }
}
