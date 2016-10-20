import React from "react";

require('./shuffletext.component.scss');

export default class ShuffleText extends React.Component {
  componentWillMount() {
    this.interval = null;
    this.setState({
      index: 0,
      step: 4,
      fps: 60,
      text: "",
    });
  }
  componentDidMount() {
    if (this.props.text && this.props.text.trim() != "") {
      setTimeout(function() {
        this.animate(this.props);
      }.bind(this), 500);
    }
  }
  componentWillReceiveProps(nextProps) {
    setTimeout(function() {
      this.animate(nextProps);
    }.bind(this), 500);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.text != nextState.text) {
      return true;
    }
    return false;
  }
  onMouseOver(event) {
    // if (!this.interval) {
    //   this.setState({
    //     index: 0,
    //     text: "",
    //   });
    //   this.animate(this.props);
    // }
  }
  animate(props) {
    const length = props.text ? props.text.length : 0;
    this.setState({
      index: 0
    });
    this.interval = setInterval(function() {
      this.setState({
        index: this.state.index + 1,
        text: props.text.substr(0, this.state.index + 1) + Math.random().toString(35).substr(2, Math.min(1, length - this.state.index - 1)),
      });
    }.bind(this), this.state.step * 1000 / this.state.fps);
    setTimeout(function() {
      clearInterval(this.interval);
      this.interval = null;
    }.bind(this), length * this.state.step * 1000 / this.state.fps + 1);
  }
  render() {
    return <div className="shuffletext" onMouseOver={this.onMouseOver.bind(this)}>
      {this.state.text}
    </div>;
  }
}
