import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";


require('./menu.component.scss');

@connect((store) => {
  return {
    layout: store.layout,
    localization: store.localization.localization,
  }
})
export default class Menu extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {

  }
  componentDidMount() {

  }
  handleMenuClick(frame, event) {
    document.querySelector("#app-scroll").scrollLeft = frame;
  }
  render() {
    return <div className="menu">
      <div className="button"><span onClick={this.handleMenuClick.bind(this, 70)}>HOME</span></div>
      <div className="button"><span onClick={this.handleMenuClick.bind(this, 140)}>ABOUT</span></div>
      <div className="button"><span onClick={this.handleMenuClick.bind(this, 210)}>RESEARCH</span></div>
      <div className="button"><span onClick={this.handleMenuClick.bind(this, 280)}>PROJECT</span></div>
    </div>;
  }
}
