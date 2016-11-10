import React from "react";
import { connect } from "react-redux";

require('./text-plain.component.scss');

@connect((store) => {
  return {
    layout: store.layout,
    localization: store.localization.localization,
  }
})
export default class TextPlain extends React.Component {
  constructor() {
    super();
    this.state = {
      fontSize: 0,
    }
  }
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.layout.width > nextProps.layout.height) {
      this.setState({
        fontSize: nextProps.layout.height * nextProps.size[0],
      });
    } else {
      this.setState({
        fontSize: nextProps.layout.height * nextProps.size[1],
      });
    }
  }
  render() {
    let style = {
      fontSize: this.state.fontSize,
    }
    return <div style={style} className="text-plain">
      {this.props.text}
    </div>;
  }
}
