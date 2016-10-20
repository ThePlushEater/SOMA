import React from "react";
import { connect } from "react-redux";

import { fetchLocalization } from "./../../actions/localizationActions";

import Header from "./../header/header.component";

require('./layout.component.scss');

const KEY = {
  LEFT: 37,
  RIGHT: 39,
  // UP: 38,
  A: 65,
  D: 68,
  // W: 87,
  // SPACE: 32
};

@connect((store) => {
  return {
    animating: store.character.animating,
    localization: store.localization.localization,
  }
})
export default class Layout extends React.Component {
  constructor() {
    super();
  }
  componentWillMount() {
    this.props.dispatch(fetchLocalization());
  }
  componentDidMount() {
    // window.addEventListener('keyup',   this.handleKeys.bind(this, false));
    window.addEventListener('keydown', this.handleKeys.bind(this, true));
  }
  handleKeys(value, event){
    if(event.keyCode === KEY.LEFT   || event.keyCode === KEY.A) {
      if (!this.props.animating) {
        this.props.dispatch({type: "MOVE_CHARACTER_LEFT"});
        this.props.dispatch({type: "SET_CHARACTER_ANIMATING"});
        setTimeout(function() {
          this.props.dispatch({type: "SET_CHARACTER_IDLE"});
        }.bind(this), 1500);
      }
    }
    if(event.keyCode === KEY.RIGHT  || event.keyCode === KEY.D) {
      if (!this.props.animating) {
        this.props.dispatch({type: "MOVE_CHARACTER_RIGHT"});
        this.props.dispatch({type: "SET_CHARACTER_ANIMATING"});
        setTimeout(function() {
          this.props.dispatch({type: "SET_CHARACTER_IDLE"});
        }.bind(this), 1500);
      }
    }
    // if(e.keyCode === KEY.UP     || e.keyCode === KEY.W) keys.up    = value;
    // if(e.keyCode === KEY.SPACE) keys.space = value;
  }
  render() {
    return <div className="layout">
      <Header />
      <div className="body">
        {this.props.children}
      </div>
    </div>;
  }
}
