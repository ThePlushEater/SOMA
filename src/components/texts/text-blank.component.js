import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";


require('./text-blank.component.scss');

@connect((store) => {
  return {
    character: store.character.character,
    localization: store.localization.localization,
  }
})
export default class TextBlank extends React.Component {
  componentWillMount() {
  }
  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {

  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  onMouseOver(event) {
    // if (!this.interval) {
    //   this.setState({
    //     index: 0,
    //     text: "",
    //   });
    //   this.animate(this.props);
    // }
  }

  render() {
    let active = "";
    let delay = "0s";
    let left = 0;
    let top = 0;
    let size = 0;
    if (this.props.character) {
      if (this.props.character.position == this.props.item.position) {
        active = " active";
        left = this.props.item.coordinate.x;
      } else if (this.props.character.position > this.props.item.position) {
        active = " passed";
      } else {
        left = "calc(" + (this.props.item.coordinate.x) + "100%)";
      }
      delay = this.props.item.delay + "s";

      top = this.props.item.coordinate.y;
      size = this.props.item.size;
    }
    const style = {
      fontSize: size,
      left: left,
      top: top,
      transitionDelay: delay,
    }
    return <div style={style} className={"text-blank" + active}>
      <div dangerouslySetInnerHTML={{__html: this.props.item.text}} />
    </div>;
  }
}
