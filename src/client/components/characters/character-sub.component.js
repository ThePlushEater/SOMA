import React from "react";
import ReactDom from "react-dom";

require('./character-sub.component.scss');

export default class CharacterSub extends React.Component {
  componentWillMount() {
    this.svg = null;
    this.loaded = false;
    this.setState({
      facingRight: true,
      start: [7, 7.5],
      duration: 2500
    });
  }
  componentDidMount() {
    const start = Math.random() * (this.state.start[1] - this.state.start[0] + 1) + this.state.start[0];
    setTimeout(function() {
      if (!this.svg) {
        this.svg = Snap.select("#character-" + this.props.id);
        this.svg.attr({
          transform: "translate(" + this.props.coords.x + ", " + (this.props.height + this.svg.getBBox().height) + ") scale(" + this.props.coords.scale + ")"
        });
      }
      this.animate();
    }.bind(this), start * 1000);
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

  animate() {
    this.svg.stop().animate({
      transform: "translate(" + this.props.coords.x + ", " + this.props.coords.y + ") scale(" + this.props.coords.scale + ")"
    }, this.state.duration, mina.easeInOutElastic, this.addEventListener);
  }

  render() {
    this.loaded = true;
    const coords = this.props.coords;
    switch(this.props.id) {
      case 1: {
        return (
          <g ref="character" id={"character-" + this.props.id} className=""><image href="./character-1.png" x={-72} y={-100} width={72} height={100} /></g>
        )
        break;
      }
      case 2: {
        return (
          <g ref="character" id={"character-" + this.props.id} className=""><image href="./character-2.png" x={-72} y={-100} width={72} height={100} /></g>
        )
        break;
      }
      case 3: {
        return (
          <g ref="character" id={"character-" + this.props.id} className=""><image href="./character-3.png" x={-72} y={-100} width={72} height={100} /></g>
        )
        break;
      }
      case 4: {
        return (
          <g ref="character" id={"character-" + this.props.id} className=""><image href="./character-4.png" x={-72} y={-100} width={72} height={100} /></g>
        )
        break;
      }
      case 5: {
        return (
          <g ref="character" id={"character-" + this.props.id} className=""><image href="./character-5.png" x={-72} y={-100} width={72} height={100} /></g>
        )
        break;
      }
    }
  }
}
