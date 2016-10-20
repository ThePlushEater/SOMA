import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";


require('./slide.component.scss');


@connect((store) => {
  return {
    character: store.character.character,
    localization: store.localization.localization,
  }
})
export default class Slide extends React.Component {
  constructor() {
    super();
    this.state = {
      ready: false,
      animate: false,
    };
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
    this.setState({
      animate: true,
      ready: false,
    });
    this.timer = setTimeout(function() {
      this.setState({
        animate: false,
        ready: false,
      });
    }.bind(this), 1500);
  }
  reset(event) {
    this.setState({
      ready: false,
    });
  }
  prepare(event) {
    this.setState({
      ready: true,
      animate: false,
    });
  }
  render() {
    let active = "";
    let delay = "0s";
    let left = 0;
    let bottom = 0;
    let width = 0;
    let status = "";
    if (this.state.animate) {
      status = " animate";
    } else if (this.state.ready) {
      status = " ready";
    }
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
      height: width
    }

    return (
      <div style={style} className={"slide" + " pos-" + this.props.actor.position + active}>
        <div style={wrapperStyle} className="wrapper">
          <img className={"actor" + status} src="./slide-actor-1.png" onMouseEnter={this.prepare.bind(this)} onClick={this.animate.bind(this)} onMouseOut={this.reset.bind(this)} />
          <img className="base left" src="./slide-base.png" />
        </div>
      </div>
    )
  }
}
