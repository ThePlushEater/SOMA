import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";


require('./character.component.scss');


@connect((store) => {
  return {
    character: store.character.character,
  }
})
export default class Character extends React.Component {
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
  showDescription(value, event) {
    if (value) {
      this.props.dispatch({type: "SET_MAIN_DESCRIPTION", payload: this.props.character.description});
    }
    //  else {
    //   this.props.dispatch({type: "SET_MAIN_DESCRIPTION", payload: ""});
    // }
  }
  render() {
    if (this.props.character) {
      let image;
      if (this.props.character.facing == "LEFT") {
        image = <img src="./trike-left.png" />;
      } else {
        image = <img src="./trike-right.png" />;
      }
      return (
        <div className={"character" + " pos-" + this.props.character.position} onMouseEnter={this.showDescription.bind(this, true)} onMouseOut={this.showDescription.bind(this, false)}>
          {image}
        </div>
      )
    }
    return null;
  }
}
