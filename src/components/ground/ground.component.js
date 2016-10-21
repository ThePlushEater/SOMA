import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";

let FontAwesome = require('react-fontawesome');

require('./ground.component.scss');


@connect((store) => {
  return {
    description: store.texts.description,
    animating: store.character.animating,
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
  navigate(value, event){
    if(value == "LEFT") {
      if (!this.props.animating) {
        this.props.dispatch({type: "SET_MAIN_DESCRIPTION", payload: ""});
        this.props.dispatch({type: "MOVE_CHARACTER_LEFT"});
        this.props.dispatch({type: "SET_CHARACTER_ANIMATING"});
        setTimeout(function() {
          this.props.dispatch({type: "SET_CHARACTER_IDLE"});
        }.bind(this), 1500);
      }
    } else if(value == "RIGHT") {
      if (!this.props.animating) {
        this.props.dispatch({type: "SET_MAIN_DESCRIPTION", payload: ""});
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

    let leftbutton, rightbutton;
    switch(this.props.ground.position) {
      case 0: {
        leftbutton = <div className="left"><FontAwesome className='' name='certificate' /> HOME</div>;
        rightbutton = <div className="right" onClick={this.navigate.bind(this, "RIGHT")}>INTRO <FontAwesome className='' name='arrow-circle-right' /></div>;
        break;
      }
      case 1: {
        leftbutton = <div className="left" onClick={this.navigate.bind(this, "LEFT")}><FontAwesome className='' name='arrow-circle-left' /> HOME</div>;
        rightbutton = <div className="right" onClick={this.navigate.bind(this, "RIGHT")}>RESEARCH <FontAwesome className='' name='arrow-circle-right' /></div>;
        break;
      }
      case 2: {
        leftbutton = <div className="left" onClick={this.navigate.bind(this, "LEFT")}><FontAwesome className='' name='arrow-circle-left' /> INTRO</div>;
        rightbutton = <div className="right" onClick={this.navigate.bind(this, "RIGHT")}>PROJECTS <FontAwesome className='' name='arrow-circle-right' /></div>;
        break;
      }
      case 3: {
        leftbutton = <div className="left" onClick={this.navigate.bind(this, "LEFT")}><FontAwesome className='' name='arrow-circle-left' /> RESEARCH</div>;
        rightbutton = <div className="right">PROJECTS <FontAwesome className='' name='certificate' /></div>;
        break;
      }
    }

    return (
      <div style={style} className={"ground" + " pos-" + this.props.ground.position + active}>
        <div className="road" />
        <div className="wrapper">
          {leftbutton}
          <div className="center" dangerouslySetInnerHTML={{__html: this.props.description}} />
          {rightbutton}
        </div>
      </div>
    )
  }
}
