import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";


require('./roof.component.scss');


@connect((store) => {
  return {
    character: store.character.character,
    localization: store.localization.localization,
  }
})
export default class Roof extends React.Component {
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
    let bottom = 0;
    let width = 0;
    let image;
    if (this.props.character) {
      if (this.props.character.position == this.props.roof.position) {
        active = " active";
        left = this.props.roof.coordinate.x + "%";
      } else if (this.props.character.position > this.props.roof.position) {
        active = " passed";
      } else {
        left = (this.props.roof.coordinate.x + 100) + "%";
      }
      delay = this.props.roof.delay + "s";

      bottom = this.props.roof.coordinate.y + "%";
      width = this.props.roof.size + "%";

      switch (this.props.roof.image) {
        case 1: {
          image = <img src="./roof-1.png" />;
          break;
        }
      }
    }
    const style = {
      width: width,
      left: left,
      bottom: bottom,
      transitionDelay: delay,
    }


    return (
      <div style={style} className={"roof" + " pos-" + this.props.roof.position + active}>
        {image}
      </div>
    )
  }
}
