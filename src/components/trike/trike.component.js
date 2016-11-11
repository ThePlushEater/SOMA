import React from "react";
import { connect } from "react-redux";

require('./trike.component.scss');

@connect((store) => {
  return {
    layout: store.layout,
    localization: store.localization.localization,
  }
})
export default class Trike extends React.Component {
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
    let image;
    if (this.props.layout.right) {
      image = <img src="./trike-right.png" />;
    } else {
      image = <img src="./trike-left.png" />;
    }
    return <div style={style} className="trike">
      {image}
    </div>;
  }
}
