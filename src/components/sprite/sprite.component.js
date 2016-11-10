import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";

import { cosineInterpolate } from "./../../utils/interpolate";

import TextTitle from "./../text/text-title.component";
import TextPlain from "./../text/text-plain.component";
import ImageCloud from "./../image/image-cloud.component";

require('./sprite.component.scss');

@connect((store) => {
  return {
    layout: store.layout,
    localization: store.localization.localization,
  }
})
export default class Sprite extends React.Component {
  constructor() {
    super();
    this.state = {
      wrapper: null,
    }
  }
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {

  }
  componentDidMount() {
    this.setState({
      wrapper: ReactDom.findDOMNode(this.refs['wrapper']),
    });
  }
  render() {
    const frame = this.props.layout.frame;
    let found = false;
    let position, transform, offset;
    let prev = this.props.item.animations[0];
    for (let i = 1; i < this.props.item.animations.length && !found; i++) {
      if (frame >= prev.frame && frame <= this.props.item.animations[i].frame) {
        found = true;
        let current = this.props.item.animations[i];
        let pos1, pos2;
        if (this.state.wrapper) {
          pos1 = [prev.position[0] * this.props.layout.width - this.state.wrapper.clientWidth * 0.5, prev.position[1] * this.props.layout.height - this.state.wrapper.clientHeight * 0.5, prev.position[2]];
          pos2 = [current.position[0] * this.props.layout.width - this.state.wrapper.clientWidth * 0.5, current.position[1] * this.props.layout.height - this.state.wrapper.clientHeight * 0.5, current.position[2]];
        } else {
          pos1 = [prev.position[0] * this.props.layout.width, prev.position[1] * this.props.layout.height, prev.position[2]];
          pos2 = [current.position[0] * this.props.layout.width, current.position[1] * this.props.layout.height, current.position[2]];
        }

        position = cosineInterpolate(pos1, pos2, (frame - prev.frame) / (current.frame - prev.frame));
      }
      prev = this.props.item.animations[i];
    }
    if (!found && frame <= this.props.item.animations[0].frame) {
      let temp = this.props.item.animations[0];
      if (this.state.wrapper) {
        position = [temp.position[0] * this.props.layout.width - this.state.wrapper.clientWidth * 0.5, temp.position[1] * this.props.layout.height - this.state.wrapper.clientHeight * 0.5, temp.position[2]];
      } else {
        position = [temp.position[0] * this.props.layout.width, temp.position[1] * this.props.layout.height, temp.position[2]];
      }
    } else if (!found && frame >= this.props.item.animations[0].frame) {
      let temp = this.props.item.animations[this.props.item.animations.length-1];
      if (this.state.wrapper) {
        position = [temp.position[0] * this.props.layout.width - this.state.wrapper.clientWidth * 0.5, temp.position[1] * this.props.layout.height - this.state.wrapper.clientHeight * 0.5, temp.position[2]];
      } else {
        position = [temp.position[0] * this.props.layout.width, temp.position[1] * this.props.layout.height, temp.position[2]];
      }
    }

    let style = {
      opacity: this.props.item.opacity ? parseFloat(this.props.item.opacity): 1,
      zIndex: this.props.item.zIndex ? parseInt(this.props.item.zIndex): 0,
      filter: this.props.item.blur ? "blur(" + Math.floor(this.props.item.blur) + "px)" : "none",
      transform: "translate(" + (position[0]) + "px, " + (position[1]) + "px)",
    }

    let child;
    if (this.props.item.type == "TITLE") {
      child = <TextTitle size={this.props.item.size} text={this.props.item.text} />;
    } else if (this.props.item.type == "PLAIN") {
      child = <TextPlain size={this.props.item.size} text={this.props.item.text} />;
    } else if (this.props.item.type == "CLOUD") {
      child = <ImageCloud size={this.props.item.size} text={this.props.item.text} />;
    }

    return <div style={style} ref="wrapper" className="sprite">
      {child}
    </div>;
  }
}
