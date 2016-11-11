import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";


require('./junglegym.component.scss');


@connect((store) => {
  return {
    layout: store.layout,
    localization: store.localization.localization,
  }
})
export default class Junglegym extends React.Component {
  constructor() {
    super();
    this.state = {
      width: 0,
      direction: "LEFT",
      jumping: false,
      curStep: 0,
      maxStep: 15,
      delay: 0.25,
    };
    this.timer = null;
  }
  componentWillMount() {

  }
  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.layout.width > nextProps.layout.height) {
      this.setState({
        width: nextProps.layout.width * nextProps.size[0],
      });
    } else {
      this.setState({
        width: nextProps.layout.width * nextProps.size[1],
      });
    }
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

  handleHover(value, event) {
    this.setState({
      jumping: value,
    });
  }
  render() {
    let step = " step-" + this.state.curStep;
    let jumping = "";
    if (this.state.jumping) {
      jumping = " jumping";
    }

    const style = {
      width: this.state.width,
      transitionDelay: this.state.delay + "s",
    }
    const wrapperStyle = {
      height: this.state.width * 0.5
    }

    return (
      <div style={style} className="junglegym">
        <div style={wrapperStyle} className="wrapper" onMouseEnter={this.handleHover.bind(this, true)} onMouseLeave={this.handleHover.bind(this, false)} onClick={this.animate.bind(this)}>
          <img className="base left" src="./junglegym-base-left.png"  />
          <img className={"actor" + step + jumping} src="./junglegym-actor.png" />
          <img className="base right" src="./junglegym-base-right.png" />
        </div>
      </div>
    )
  }
}
