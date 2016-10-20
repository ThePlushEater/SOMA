import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";


require('./junglegym.component.scss');


@connect((store) => {
  return {
    character: store.character.character,
    localization: store.localization.localization,
  }
})
export default class Junglegym extends React.Component {
  constructor() {
    super();
    this.state = {
      direction: "LEFT",
      curStep: 0,
      maxStep: 15,
    };
    this.timer = null;
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
  animate(event) {
    let curStep, direction;
    if (this.state.direction == "LEFT") {
      curStep = this.state.curStep + 1;
      direction = "LEFT";
      if (curStep > this.state.maxStep) {
        curStep = this.state.maxStep;
        direction = "RIGHT";
      }
    } else {
      curStep = this.state.curStep - 1;
      direction = "RIGHT";
      if (curStep < 0) {
        curStep = 0;
        direction = "LEFT";
      }
    }
    this.setState({
      curStep: curStep,
      direction: direction,
    });
  }
  render() {
    let active = "";
    let delay = "0s";
    let left = 0;
    let bottom = 0;
    let width = 0;
    let step = " step-" + this.state.curStep;
    if (this.props.character) {
      if (this.props.character.position == this.props.actor.position) {
        active = " active";
        left = this.props.actor.coordinate.x + "%";
      } else if (this.props.character.position > this.props.actor.position) {
        active = " passed";
      } else {
        left = (this.props.actor.coordinate.x + 100) + "%";
      }
      delay = this.props.actor.delay + "s";

      bottom = this.props.actor.coordinate.y + "%";
      width = this.props.actor.size;

    }
    const style = {
      width: width,
      left: left,
      bottom: bottom,
      transitionDelay: delay,
    }

    const wrapperStyle = {
      height: width * 0.5
    }

    return (
      <div style={style} className={"junglegym" + " pos-" + this.props.actor.position + active}>
        <div style={wrapperStyle} className="wrapper">
          <img className="base left" src="./junglegym-base-left.png" onClick={this.animate.bind(this)} />
          <img className={"actor" + step} src="./junglegym-actor.png" onClick={this.animate.bind(this)} />
          <img className="base right" src="./junglegym-base-right.png" onClick={this.animate.bind(this)} />
        </div>
      </div>
    )
  }
}
