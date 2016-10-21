import React from "react";
import { connect } from "react-redux";

require('./text-plain.component.scss');

@connect((store) => {
  return {
    pageWidth: store.layout.width,
    pageHeight: store.layout.height,
    localization: store.localization.localization,
  }
})
export default class TextPlain extends React.Component {
  componentWillMount() {

  }
  render() {
    let style;
    if (this.props.size.x != null && this.props.size.y != null) {
      style = {
        width: (this.props.size.x * this.props.pageWidth) + "px",
        height: (this.props.size.y * this.props.pageHeight) + "px",
      }
      // style = {
      //   fontSize: Math.min((this.props.size.x * this.props.pageWidth * 0.25), (this.props.size.y * this.props.pageHeight)) + "px",
      // }
    } else if (this.props.size.x != null && this.props.size.y == null) {
      style = {
        width: (this.props.size.x * this.props.pageWidth) + "px",
      }
      // style = {
      //   fontSize: (this.props.size.x * this.props.pageWidth * 0.25) + "px",
      // }
    } else {
      style = {
        fontSize: (this.props.size.y * this.props.pageHeight) + "px",
        height: (this.props.size.y * this.props.pageHeight) + "px",
      }
      // style = {
      //   fontSize: (this.props.size.y * this.props.pageHeight) + "px",
      // }
    }

    return <div style={style} className="text-plain">
      <div className="center" dangerouslySetInnerHTML={{__html: this.props.text}} />
    </div>;
  }
}
