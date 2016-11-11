import React from "react";
import { connect } from "react-redux";

require('./cloud.component.scss');

@connect((store) => {
  return {
    layout: store.layout,
    localization: store.localization.localization,
  }
})
export default class Cloud extends React.Component {
  constructor() {
    super();
    this.state = {
      width: 0,
    }
  }
  componentWillMount() {

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
  render() {
    let style = {
      width: this.state.width,
    }
    return <div style={style} className="cloud">
      <img src="./cloud-1.png" />
    </div>;
  }
}
