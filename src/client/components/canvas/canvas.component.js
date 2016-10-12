import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";

import store from "./../../store/store";
import Road from "./../graphics/road.component";

require('./canvas.component.scss');

@connect((store) => {
  return {
    // front: store.layout.front,
    localization: store.localization.localization,
  }
})
export default class Canvas extends React.Component {
  componentWillMount() {
    this.setState({width: 0, height: 0});
  }
  componentDidMount() {
    const cavnas = ReactDom.findDOMNode(this.refs['canvas']);
    setTimeout(function() {
      this.setState({width: cavnas.clientWidth, height: cavnas.clientHeight});
    }.bind(this), 1000);
  }
  render() {
    return <svg ref="canvas" className="canvas">
      <Road coords={{x1: "5%", y1: "90%", x2: "95%", y2: "90%"}} width={this.state.width} height={this.state.height} />
    </svg>;
  }
}
