import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";


require('./parallax-layer.component.scss');


@connect((store) => {
  return {
    pageWidth: store.layout.width,
    pageHeight: store.layout.height,
    scrollLeft: store.layout.scrollLeft,
    localization: store.localization.localization,
  }
})
export default class ParallaxLayer extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
    }
  }
  componentWillMount() {

  }
  componentDidMount() {
    setTimeout(function() {
      this.setState({
        visible: true,
      });
    }.bind(this), 500);
    this.setState({
      wrapper: ReactDom.findDOMNode(this.refs['wrapper']),
    });
  }
  componentWillReceiveProps(nextProps) {

  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  componentWillUnmount() {

  }
  render() {
    let style;
    const filter = this.props.blur ? "blur(" + Math.floor(this.props.blur) + "px)" : "none";
    const zIndex = this.props.speed ? Math.abs(Math.floor(this.props.speed)) : 1;
    const visibility = this.state.visible ? "visible" : "hidden";
    if (this.props.valign == "TOP") {
      style = {
        top: 0,
        filter: filter,
        zIndex: zIndex,
        // visibility: this.props.position.x != null && this.props.position.y != null && this.props.speed != null && this.props.scrollLeft != null ? "visible" : "hidden",
        visibility: visibility,
        transform: "translate(" + (this.props.page * this.props.pageWidth + this.props.position.x * this.props.pageWidth - this.props.speed * this.props.scrollLeft) + "px, " + (this.props.position.y * this.props.pageHeight) + "px)",
      }
      if (this.props.origin == 4 && this.state.wrapper) {
        style = {
          top: 0,
          filter: filter,
          zIndex: zIndex,
          // visibility: this.props.position.x != null && this.props.position.y != null && this.props.speed != null && this.props.scrollLeft != null ? "visible" : "hidden",
          visibility: visibility,
          transform: "translate(" + (this.props.page * this.props.pageWidth + this.props.position.x * this.props.pageWidth - this.props.speed * this.props.scrollLeft - this.state.wrapper.clientWidth * 0.5) + "px, " + (this.props.position.y * this.props.pageHeight - this.state.wrapper.clientHeight * 0.5) + "px)",
        }
      }
    } else if (this.props.valign == "BOTTOM") {
      style = {
        bottom: 0,
        filter: filter,
        zIndex: zIndex,
        visibility: visibility,
        transform: "translate(" + (this.props.page * this.props.pageWidth + this.props.position.x * this.props.pageWidth - this.props.speed * this.props.scrollLeft) + "px, " + (-this.props.position.y * this.props.pageHeight) + "px)",
      }
      if (this.props.origin == 4 && this.state.wrapper) {
        style = {
          bottom: 0,
          filter: filter,
          zIndex: zIndex,
          visibility: visibility,
          transform: "translate(" + (this.props.page * this.props.pageWidth + this.props.position.x * this.props.pageWidth - this.props.speed * this.props.scrollLeft - this.state.wrapper.clientWidth * 0.5) + "px, " + (-this.props.position.y * this.props.pageHeight + this.state.wrapper.clientHeight * 0.5) + "px)",
        }
      }
    }
    return (
      <div ref="wrapper" style={style} className="parallax-layer">
        {this.props.child}
      </div>
    )
  }
}
