import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";


require('./theater.component.scss');


@connect((store) => {
  return {
    character: store.character.character,
    localization: store.localization.localization,
  }
})
export default class Theater extends React.Component {
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
    let height = 0;
    let image;
    if (this.props.character) {
      if (this.props.character.position == this.props.theater.position) {
        active = " active";
        left = this.props.theater.coordinate.x + "%";
      } else if (this.props.character.position > this.props.theater.position) {
        active = " passed";
      } else {
        left = (this.props.theater.coordinate.x + 100) + "%";
      }
      delay = this.props.theater.delay + "s";

      bottom = this.props.theater.coordinate.y + "%";
      height = this.props.theater.size + "%";

      switch (this.props.theater.image) {
        case 1: {
          image = <img className="actor" src="./theater-cameleon.png" />;
          break;
        }
      }
    }
    const style = {
      width: height,
      height: height,
      left: left,
      bottom: bottom,
      transitionDelay: delay,
    }


    return (
      <div style={style} className={"theater" + " pos-" + this.props.theater.position + active}>
        <div className="wrapper">
          <img className="base" src="./theater-base.png" />
          {image}
        </div>
      </div>
    )
  }
}
