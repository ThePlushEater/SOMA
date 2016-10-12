import React from "react";
import ReactDom from "react-dom";

require('./character-main.component.scss');

export default class CharacterMain extends React.Component {
  componentWillMount() {
    this.svg = null;
    this.loaded = false;
    this.setState({
      facingRight: true,
      delay: [5],
      duration: 2500
    });
  }
  componentDidMount() {
    setTimeout(function() {
      if (!this.svg) {
        this.svg = Snap.select("#character-" + this.props.id);
        this.svg.attr({
          transform: "translate(" + (0) + ", " + this.props.coords.y + ") scale(" + this.props.coords.scale + ")"
        });
      }
      this.animate(0);
    }.bind(this), this.state.delay[0] * 1000);
  }

  componentWillReceiveProps(nextProps) {
    // if (this.props.animating && !nextProps.animating) {
    //   if (this.svg) {
    //     this.svg.stop();
    //   }
    // } else if (!this.props.animating && nextProps.animating) {
    //   if (this.svg) {
    //     this.animate();
    //   }
    // }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.loaded) {
      if (this.state.facingRight != nextState.facingRight) {
        return true;
      }
      return false;
    } else {
      if (this.props.width == 0 || this.props.height == 0) {
        return false;
      }
      return true;
    }
  }

  addEventListener() {

  }

  animate(direction) {
    switch(direction) {
      case -1: {
        this.svg.stop().animate({
          transform: "translate(" + (this.props.coords.x - 4) + ", " + this.props.coords.y + ") scale(" + this.props.coords.scale + ")"
        }, this.state.duration, mina.easeOutQuad);
        break;
      }
      case 0: {
        this.svg.stop().animate({
          transform: "translate(" + this.props.coords.x + ", " + this.props.coords.y + ") scale(" + this.props.coords.scale + ")"
        }, this.state.duration, mina.easeOutQuad, this.addEventListener);
        break;
      }
      case 1: {
        this.svg.stop().animate({
          transform: "translate(" + (this.props.coords.x + 4) + ", " + this.props.coords.y + ") scale(" + this.props.coords.scale + ")"
        }, this.state.duration, mina.easeOutQuad);
        break;
      }
    }
  }

  render() {
    this.loaded = true;
    const coords = this.props.coords;
    if (this.state.facingRight) {
      return (
        <g ref="character" id={"character-" + this.props.id} className=""><image href="./character-main-right.png" x={-72} y={-100} width={72} height={100} /></g>
      )
    } else {
      return (
        <g ref="character" id={"character-" + this.props.id} className=""><image href="./character-main-left.png" x={-72} y={-100} width={72} height={100} /></g>
      )
    }
    return null;
  }
}
