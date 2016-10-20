import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";


require('./building.component.scss');


@connect((store) => {
  return {
    character: store.character.character,
    localization: store.localization.localization,
  }
})
export default class Building extends React.Component {
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
      if (this.props.character.position == this.props.building.position) {
        active = " active";
        left = this.props.building.coordinate.x + "%";
      } else if (this.props.character.position > this.props.building.position) {
        active = " passed";
      } else {
        left = (this.props.building.coordinate.x + 100) + "%";
      }
      delay = this.props.building.delay + "s";

      bottom = this.props.building.coordinate.y + "%";
      width = this.props.building.size;

      switch (this.props.building.image) {
        case 1: {
          image = <img src="./building-1.png" />;
          break;
        }
        case 2: {
          image = <img src="./building-2.png" />;
          break;
        }
        case 3: {
          image = <img src="./building-3.png" />;
          break;
        }
        case 4: {
          image = <img src="./building-4.png" />;
          break;
        }
        case 5: {
          image = <img src="./building-5.png" />;
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
      <div style={style} className={"building" + " pos-" + this.props.building.position + active}>
        {image}
      </div>
    )
  }
}
