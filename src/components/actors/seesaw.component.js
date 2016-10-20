import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";


require('./seesaw.component.scss');


@connect((store) => {
  return {
    character: store.character.character,
    localization: store.localization.localization,
  }
})
export default class Seesaw extends React.Component {
  constructor() {
    super();
    this.state = {
      animating: false,
      direction: "LEFT"
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
  animate(value, event) {
    if (!value) {
      if (this.timer) {
        clearInterval(this.timer);
      }
      if (this.state.direction == "LEFT") {
        this.setState({
          animating: value,
          direction: "RIGHT",
        });
      } else {
        this.setState({
          animating: value,
          direction: "LEFT",
        });
      }
    }
    
    if (value) {
      this.setState({
        animating: value,
      });
      this.timer = setInterval(function() {
        if (this.state.direction == "LEFT") {
          this.setState({
            direction: "RIGHT",
          });
        } else {
          this.setState({
            direction: "LEFT",
          });
        }
      }.bind(this), 1000);
    }


  }
  render() {
    let active = "";
    let delay = "0s";
    let animate = "";
    let left = 0;
    let bottom = 0;
    let width = 0;
    if (this.state.animating) {
      if (this.state.direction == "LEFT") {
        animate = " animate left";
      } else {
        animate = " animate right";
      }
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

    return (
      <div style={style} className={"seesaw" + " pos-" + this.props.actor.position + active}>
        <div className="wrapper">
          <img className={"actors" + animate} src="./seesaw-actors.png" onMouseEnter={this.animate.bind(this, true)} onMouseOut={this.animate.bind(this, false)} />
          <img className="base" src="./seesaw-base.png" />
        </div>
      </div>
    )
  }
}
