import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";


require('./trike.component.scss');


@connect((store) => {
  return {
    pageWidth: store.layout.width,
    pageHeight: store.layout.height,
    localization: store.localization.localization,
  }
})
export default class Trike extends React.Component {
  constructor() {
    super();
  }
  componentWillMount() {

  }
  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {

  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  componentWillUnmount() {

  }
  // showDescription(value, event) {
  //   if (value) {
  //     this.props.dispatch({type: "SET_MAIN_DESCRIPTION", payload: this.props.character.description});
  //   }
  //   //  else {
  //   //   this.props.dispatch({type: "SET_MAIN_DESCRIPTION", payload: ""});
  //   // }
  // }
  render() {
    let imageStyle;
    if (this.props.size.x != null && this.props.size.y != null) {
      style = {
        width: Math.min((this.props.size.x * this.props.pageWidth), (this.props.size.y * this.props.pageHeight * 1.1)) + "px",
        height: Math.min((this.props.size.x * this.props.pageWidth), (this.props.size.y * this.props.pageHeight * 1.1)) + "px",
      }
    } else if (this.props.size.x != null && this.props.size.y == null) {
      imageStyle = {
        width: (this.props.size.x * this.props.pageWidth * 0.3) + "px",
        height: "auto",
      }
    } else {
      imageStyle = {
        width: "auto",
        height: (this.props.size.y * this.props.pageHeight * 1.1) + "px",
      }
    }
    let image = <img style={imageStyle} src="./trike-right.png" />;
    return (
      <div className="trike">
        {image}
      </div>
    )
  }
}
