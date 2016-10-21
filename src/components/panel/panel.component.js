import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";

import ShuffleText from "./../shuffletext/shuffletext.component";


require('./panel.component.scss');


@connect((store) => {
  return {
    character: store.character.character,
    localization: store.localization.localization,
  }
})
export default class Panel extends React.Component {
  constructor() {
    super();
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
  render() {
    let active = "";
    let delay = "0s";
    let left = 0;
    let bottom = 0;
    let width = 0;
    let image, text;
    if (this.props.character) {
      if (this.props.character.position == this.props.panel.position) {
        active = " active";
        left = this.props.panel.coordinate.x + "%";
      } else if (this.props.character.position > this.props.panel.position) {
        active = " passed";
      } else {
        left = (this.props.panel.coordinate.x + 100) + "%";
      }
      delay = this.props.panel.delay + "s";

      bottom = this.props.panel.coordinate.y + "%";
      width = this.props.panel.size;
      text = <ShuffleText text={this.props.panel.text} reset={true} />

      switch (this.props.panel.image) {
        case 1: {
          image = <img src="./panel-playground.png" />;
          break;
        }
      }
    }
    const style = {
      width: width,
      left: left,
      bottom: bottom,
      transitionDelay: delay,
    }

    return (
      <div style={style} className={"panel" + " pos-" + this.props.panel.position + active}>
        <div className="wrapper">
          {image}
          {text}
        </div>
      </div>
    )
  }
}
