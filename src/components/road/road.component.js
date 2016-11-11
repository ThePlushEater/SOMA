import React from "react";
import { connect } from "react-redux";

require('./road.component.scss');

@connect((store) => {
  return {
    layout: store.layout,
    localization: store.localization.localization,
  }
})
export default class Road extends React.Component {
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
        width: nextProps.layout.width * 2,
        height: nextProps.layout.height * nextProps.size[0],
      });
    } else {
      this.setState({
        width: nextProps.layout.width * 2,
        height: nextProps.layout.height * nextProps.size[1],
      });
    }
  }
  render() {
    let style = {
      width: this.state.width,
      height: this.state.height,
    }
    return <div style={style} className="road">

    </div>;
  }
}
