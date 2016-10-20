import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";


require('./bookshelf.component.scss');


@connect((store) => {
  return {
    character: store.character.character,
    localization: store.localization.localization,
  }
})
export default class Bookshelf extends React.Component {
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
      if (this.props.character.position == this.props.bookshelf.position) {
        active = " active";
        left = this.props.bookshelf.coordinate.x + "%";
      } else if (this.props.character.position > this.props.bookshelf.position) {
        active = " passed";
      } else {
        left = (this.props.bookshelf.coordinate.x + 100) + "%";
      }
      delay = this.props.bookshelf.delay + "s";

      bottom = this.props.bookshelf.coordinate.y + "%";
      width = this.props.bookshelf.size;

      switch (this.props.bookshelf.image) {
        case 1: {
          image = <img src="./bookshelf-1.png" />;
          break;
        }
        case 2: {
          image = <img src="./bookshelf-2.png" />;
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
      <div style={style} className={"bookshelf" + " pos-" + this.props.bookshelf.position + active}>
        {image}
      </div>
    )
  }
}
