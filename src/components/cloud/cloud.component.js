import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";


require('./cloud.component.scss');


@connect((store) => {
  return {
    character: store.character.character,
    localization: store.localization.localization,
  }
})
export default class Cloud extends React.Component {
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
  render() {
    let active = "";
    let delay = "0s";
    let left = 0;
    let top = 0;
    let width = 0;
    if (this.props.character) {
      if (this.props.character.position == this.props.cloud.position) {
        active = " active";
        left = this.props.cloud.coordinate.x + "%";
      } else if (this.props.character.position > this.props.cloud.position) {
        active = " passed";
      } else {
        left = (this.props.cloud.coordinate.x + 100) + "%";
      }
      delay = this.props.cloud.delay + "s";

      top = this.props.cloud.coordinate.y + "%";
      width = this.props.cloud.size;
    }
    const style = {
      width: width,
      left: left,
      top: top,
      transitionDelay: delay,
    }

    return (
      <div style={style} className={"cloud" + " pos-" + this.props.cloud.position + active}>
        <img src="./cloud-1.png" />
      </div>
    )
  }
}
