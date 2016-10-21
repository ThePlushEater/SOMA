import React from "react";
import { connect } from "react-redux";

require('./text-title.component.scss');

@connect((store) => {
  return {
    pageWidth: store.layout.width,
    pageHeight: store.layout.height,
    localization: store.localization.localization,
  }
})
export default class TextTitle extends React.Component {
  componentWillMount() {

  }
  render() {
    let wrapperStyle, imageStyle;
    if (this.props.size.x != null && this.props.size.y != null) {
      wrapperStyle = {
        fontSize: Math.min((this.props.size.x * this.props.pageWidth * 0.25), (this.props.size.y * this.props.pageHeight)) + "px",
      }
      imageStyle = {
        width: Math.min((this.props.size.x * this.props.pageWidth * 0.3), (this.props.size.y * this.props.pageHeight * 1.1)) + "px",
        height: Math.min((this.props.size.x * this.props.pageWidth * 0.3), (this.props.size.y * this.props.pageHeight * 1.1)) + "px",
      }
    } else if (this.props.size.x != null && this.props.size.y == null) {
      wrapperStyle = {
        fontSize: (this.props.size.x * this.props.pageWidth * 0.25) + "px",
      }
      imageStyle = {
        width: (this.props.size.x * this.props.pageWidth * 0.3) + "px",
        height: (this.props.size.x * this.props.pageWidth * 0.3) + "px",
      }
    } else {
      wrapperStyle = {
        fontSize: (this.props.size.y * this.props.pageHeight) + "px",
      }
      imageStyle = {
        width: (this.props.size.y * this.props.pageHeight * 1.1) + "px",
        height: (this.props.size.y * this.props.pageHeight * 1.1) + "px",
      }
    }

    return <div style={wrapperStyle} className="text-title">
      <span>S</span>
      <img style={imageStyle} src="./kids.png" />
      <span>MA</span>
    </div>;
  }
}
