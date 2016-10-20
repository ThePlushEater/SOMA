import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";


require('./ground.component.scss');


@connect((store) => {
  return {
    character: store.character.character,
    localization: store.localization.localization,
  }
})
export default class Ground extends React.Component {
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
    if (this.props.character) {
      if (this.props.character.position == this.props.ground.position) {
        active = " active";
      } else if (this.props.character.position > this.props.ground.position) {
        active = " passed";
      }
      delay = this.props.ground.delay + "s";
    }
    const style = {
      transitionDelay: delay,
    }

    return (
      <div style={style} className={"ground" + " pos-" + this.props.ground.position + active}>
        <div className="road" />
      </div>
    )
  }
}
