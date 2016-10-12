import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";

import store from "./../../store/store";
import Road from "./../graphics/road.component";
import Cloud from "./../graphics/cloud.component";
import CharacterMain from "./../characters/character-main.component";
import CharacterSub from "./../characters/character-sub.component";

require('./home-canvas.component.scss');

@connect((store) => {
  return {
    focus: store.layout.focus,
    localization: store.localization.localization,
  }
})
export default class HomeCanvas extends  React.Component {
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
    return <svg ref="canvas" className="home-canvas">
      <Road coords={{x1: "0%", y1: "95%", x2: "100%", y2: "95%"}} width={this.state.width} height={this.state.height} />
      <Cloud id={0} coords={{x: this.state.width * 0.4, y: this.state.height * 0.15, scale: 0.75}} width={this.state.width} height={this.state.height} animating={this.props.focus} />
      <Cloud id={1} coords={{x: this.state.width * 0.25, y: this.state.height * 0.25, scale: 0.65}} width={this.state.width} height={this.state.height} animating={this.props.focus} />
      <Cloud id={2} coords={{x: this.state.width * 0.75, y: this.state.height * 0.265, scale: 0.45}} width={this.state.width} height={this.state.height} animating={this.props.focus} />
      <Cloud id={3} coords={{x: this.state.width * 0.65, y: this.state.height * 0.1, scale: 0.55}} width={this.state.width} height={this.state.height} animating={this.props.focus} />
      <Cloud id={4} coords={{x: this.state.width * 0.05, y: this.state.height * 0.175, scale: 0.5}} width={this.state.width} height={this.state.height} animating={this.props.focus} />
      <Cloud id={5} coords={{x: this.state.width * 0.9, y: this.state.height * 0.125, scale: 0.35}} width={this.state.width} height={this.state.height} animating={this.props.focus} />
      <Cloud id={6} coords={{x: this.state.width * 0.35, y: this.state.height * 0.025, scale: 0.325}} width={this.state.width} height={this.state.height} animating={this.props.focus} />

      <CharacterMain id={0} coords={{x: this.state.width * 0.1, y: this.state.height * 0.95, scale: 1}} width={this.state.width} height={this.state.height} animating={this.props.focus} />
      <CharacterSub id={1} coords={{x: this.state.width * 0.3, y: this.state.height * 0.95, scale: 1}} width={this.state.width} height={this.state.height} animating={this.props.focus} />
      <CharacterSub id={2} coords={{x: this.state.width * 0.45, y: this.state.height * 0.95, scale: 1}} width={this.state.width} height={this.state.height} animating={this.props.focus} />
      <CharacterSub id={3} coords={{x: this.state.width * 0.6, y: this.state.height * 0.95, scale: 1}} width={this.state.width} height={this.state.height} animating={this.props.focus} />
      <CharacterSub id={4} coords={{x: this.state.width * 0.75, y: this.state.height * 0.95, scale: 1}} width={this.state.width} height={this.state.height} animating={this.props.focus} />
      <CharacterSub id={5} coords={{x: this.state.width * 0.9, y: this.state.height * 0.95, scale: 1}} width={this.state.width} height={this.state.height} animating={this.props.focus} />
    </svg>;
  }
}
