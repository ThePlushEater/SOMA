import React from "react";
import { connect } from "react-redux";

require('./mountain.component.scss');

@connect((store) => {
  return {
    layout: store.layout,
    localization: store.localization.localization,
  }
})
export default class Mountain extends React.Component {
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
        image = <img src="./mountain-1.png" />;
        break;
      }
      case 2: {
        image = <img src="./mountain-2.png" />;
        break;
      }
      case 3: {
        image = <img src="./mountain-3.png" />;
        break;
      }
      case 4: {
        image = <img src="./mountain-4.png" />;
        break;
      }
      case 5: {
        image = <img src="./mountain-5.png" />;
        break;
      }
      case 6: {
        image = <img src="./mountain-6.png" />;
        break;
      }
    }

    let style = {
      width: this.state.width,
    }
    return <div style={style} className="mountain">
      {image}
    </div>;
  }
}
