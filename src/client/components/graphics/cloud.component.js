import React from "react";
import ReactDom from "react-dom";

require('./cloud.component.scss');

export default class Cloud extends React.Component {
  componentWillMount() {
    this.svg = null;
    this.loaded = false;
    this.setState({
      path: "M208.3,57.5c61.6-18.3,77.2,72.7,22,81c-22,3.3-58.1,0-92,0c-34.9,0-71,2.5-91,0c-23.1-2.8-50.4-19.5-47-46  c3.3-26,34.7-38.4,67-37c10.3-27.8,28.6-51.5,62-55C172.2-3.9,199.9,22.2,208.3,57.5z",
      delay: [2, 3, 3, 4],
      start: [1, 2],
      duration: 100
    });
  }
  componentDidMount() {
    setTimeout(function() {
      if (!this.svg) {
        this.svg = Snap.select("#cloud-" + this.props.id);
        this.svg.attr({
          transform: "translate(" + this.props.coords.x + ", " + this.props.coords.y + ") scale(" + this.props.coords.scale + ")"
        });
      }
      this.animate();
    }.bind(this), this.state.delay[3] * 1000);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.animating && !nextProps.animating) {
      if (this.svg) {
        this.svg.stop();
      }
    } else if (!this.props.animating && nextProps.animating) {
      if (this.svg) {
        this.animate();
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.loaded) {
      return false;
    }
    return true;
  }

  animate() {
    const cloud = ReactDom.findDOMNode(this.refs['cloud']);
    setTimeout(function() {
      if (cloud) {
        cloud.setAttribute('class', 'cloud load');
      }
    }, 100);
    this.svg.stop().animate({
      transform: "translate(" + (-1 * this.svg.getBBox().width) + ", " + this.props.coords.y + ") scale(" + this.props.coords.scale + ")"
    }, Math.max(this.svg.getBBox().x, 100) * this.state.duration / this.props.coords.scale, function() {
      this.props.coords.x = Math.random() * (this.props.width * 0.4) + this.props.width * 0.5;
      // this.props.coords.x = this.props.width - this.svg.getBBox().width;
      if (cloud) {
        cloud.setAttribute('class', 'cloud');
      }
      this.svg.attr({
        transform: "translate(" + this.props.coords.x + ", " + this.props.coords.y + ") scale(" + this.props.coords.scale + ")"
      });
      this.animate();
    }.bind(this));
  }

  render() {
    if (!this.loaded && this.props.width !== 0 && this.props.height !== 0) {
      this.loaded = true;
      const coords = this.props.coords;
      const start = Math.random() * (this.state.start[1] - this.state.start[0] + 1) + this.state.start[0];
      const divStyle = {
        animationDelay: this.state.delay.map((item) => {
          return (item + start) + "s";
        }).join(",")
      }
      return (
        <path ref="cloud" id={"cloud-" + this.props.id} className="cloud load" style={divStyle} d={this.state.path} transform={"translate(" + coords.x + ", " + coords.y + ") scale(" + coords.scale + ")"} />
      )
    }
    return null;
  }
}
