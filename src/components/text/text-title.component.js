import React from "react";
import { connect } from "react-redux";

require('./text-title.component.scss');

@connect((store) => {
  return {
    layout: store.layout,
    localization: store.localization.localization,
  }
})
export default class TextTitle extends React.Component {
  constructor() {
    super();
    this.state = {
      width: 0,
      height: 0,
      ratio: 0.3,
    }
  }
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.layout.width > nextProps.layout.height) {
      this.setState({
        width: nextProps.layout.width * nextProps.size[0],
        height: nextProps.layout.width * nextProps.size[0] * this.state.ratio,
      });
    } else {
      this.setState({
        width: nextProps.layout.width * nextProps.size[1],
        height: nextProps.layout.width * nextProps.size[1] * this.state.ratio,
      });
    }
  }
  render() {
    let style = {
      width: this.state.width,
      height: this.state.height,
      fontSize: this.state.height * 0.9,
    }
    let imgStyle = {
      width: this.state.height,
      height: this.state.height,
    }
    return <div style={style} className="text-title">
      <span>S</span>
      <img style={imgStyle} src="./kids.png" />
      <span>MA</span>
    </div>;
  }
}
