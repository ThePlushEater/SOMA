import React from "react";
import { connect } from "react-redux";

require('./flower.component.scss');

@connect((store) => {
  return {
    layout: store.layout,
    localization: store.localization.localization,
  }
})
export default class Flower extends React.Component {
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
    let image;
    switch (parseInt(this.props.image)) {
      case 1: {
        image = <img src="./flower-pink.png" />;
        break;
      }
      case 2: {
        image = <img src="./flower-yellow.png" />;
        break;
      }
    }

    let style = {
      width: this.state.width,
    }
    return <div style={style} className="flower">
      {image}
    </div>;
  }
}
