import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";


require('./seesaw.component.scss');

@connect((store) => {
  return {
    layout: store.layout,
    localization: store.localization.localization,
  }
})
export default class Seesaw extends React.Component {
  constructor() {
    super();
    this.state = {
      animating: false,
      direction: "LEFT",
      stack: 0,
      delay: 0.25,
    };
    this.timer = null;
    this.timer2 = null;
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
  handleClick(event) {
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (this.timer2) {
      clearTimeout(this.timer2);
    }
    if (this.state.direction == "LEFT") {
      this.setState({
        animating: true,
        direction: "RIGHT",
        stack: this.state.stack + 1,
      });
    } else {
      this.setState({
        animating: true,
        direction: "LEFT",
        stack: this.state.stack + 1,
      });
    }
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

    this.timer2 = setTimeout(function() {
      this.setState({
        animating: false,
        stack: 0,
      });
    }.bind(this), 1000 * (this.state.stack + 1));
  }

  animate(value, event) {
    return;
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
  showTooltip(value, event) {

  }
  render() {
    let animate = "";
    if (this.state.animating) {
      if (this.state.direction == "LEFT") {
        animate = " animate left";
      } else {
        animate = " animate right";
      }
    }

    const style = {
      width: this.state.width,
      transitionDelay: this.state.delay + "s",
    }

    return (
      <div style={style} className="seesaw">
        <div className="wrapper">
          <img className={"actors" + animate} src="./seesaw-actors.png" onMouseEnter={this.showTooltip.bind(this, true)} onMouseOut={this.showTooltip.bind(this, false)} onClick={this.handleClick.bind(this)}/>
          <img className="base" src="./seesaw-base.png" />
        </div>
      </div>
    )
  }
}
