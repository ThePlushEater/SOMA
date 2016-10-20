import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";


require('./mountain.component.scss');


@connect((store) => {
  return {
    character: store.character.character,
    localization: store.localization.localization,
  }
})
export default class Mountain extends React.Component {
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
      if (this.props.character.position == this.props.mountain.position) {
        active = " active";
        left = this.props.mountain.coordinate.x + "%";
      } else if (this.props.character.position > this.props.mountain.position) {
        active = " passed";
      } else {
        left = (this.props.mountain.coordinate.x + 100) + "%";
      }
      delay = this.props.mountain.delay + "s";

      bottom = this.props.mountain.coordinate.y + "%";
      width = this.props.mountain.size;

      switch (this.props.mountain.image) {
        case 1: {
          image = <img src="./mountain-1.png" />;
          break;
        }
        case 2: {
          image = <img src="./mountain-2.png" />;
          break;
        }
        case 3: {
          image = <img src="./mountain-3.png" />;
          break;
        }
        case 4: {
          image = <img src="./mountain-4.png" />;
          break;
        }
        case 5: {
          image = <img src="./mountain-5.png" />;
          break;
        }
        case 6: {
          image = <img src="./mountain-6.png" />;
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
      <div style={style} className={"mountain" + " pos-" + this.props.mountain.position + active}>
        {image}
      </div>
    )
  }
}
