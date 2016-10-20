import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";


require('./pillar.component.scss');


@connect((store) => {
  return {
    character: store.character.character,
    localization: store.localization.localization,
  }
})
export default class Pillar extends React.Component {
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
      if (this.props.character.position == this.props.pillar.position) {
        active = " active";
        left = this.props.pillar.coordinate.x + "%";
      } else if (this.props.character.position > this.props.pillar.position) {
        active = " passed";
      } else {
        left = (this.props.pillar.coordinate.x + 100) + "%";
      }
      delay = this.props.pillar.delay + "s";

      bottom = this.props.pillar.coordinate.y + "%";
      height = this.props.pillar.size + "%";

      switch (this.props.pillar.image) {
        case 1: {
          image = <img src="./pillar-1.png" />;
          break;
        }
      }
    }
    const style = {
      height: height,
      left: left,
      bottom: bottom,
      transitionDelay: delay,
    }

    return (
      <div style={style} className={"pillar" + " pos-" + this.props.pillar.position + active}>
        {image}
      </div>
    )
  }
}
