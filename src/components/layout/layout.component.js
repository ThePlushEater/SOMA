import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";

import { fetchLocalization } from "./../../actions/localizationActions";

require('./layout.component.scss');

// const KEY = {
//   LEFT: 37,
//   RIGHT: 39,
//   // UP: 38,
//   A: 65,
//   D: 68,
//   // W: 87,
//   // SPACE: 32
// };

@connect((store) => {
  return {
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
    const body = ReactDom.findDOMNode(this.refs['body']);
    this.props.dispatch({type: "SET_LAYOUT_SIZE", payload: {width: body.clientWidth, height: body.clientHeight}});
    body.addEventListener('mousewheel', this.handleMouseWheel.bind(this, body));
    body.addEventListener('scroll', this.handleScroll.bind(this, body));
    window.addEventListener('resize', this.handleResize.bind(this, body));
  }
  handleMouseWheel(element, event) {
    element.scrollLeft += event.deltaY * 0.1;
  }
  handleScroll(element, event) {
    this.props.dispatch({type: "SET_LAYOUT_SCROLL_LEFT", payload: element.scrollLeft});
    // console.log(element.scrollLeft);
  }
  handleResize(element, event) {
    this.props.dispatch({type: "SET_LAYOUT_SIZE", payload: {width: element.clientWidth, height: element.clientHeight}});
    this.props.dispatch({type: "SET_LAYOUT_SCROLL_LEFT", payload: element.scrollLeft});
  }
  // handleKeys(value, event){
  //   if(event.keyCode === KEY.LEFT   || event.keyCode === KEY.A) {
  //     if (!this.props.animating) {
  //       this.props.dispatch({type: "SET_MAIN_DESCRIPTION", payload: ""});
  //       this.props.dispatch({type: "MOVE_CHARACTER_LEFT"});
  //       this.props.dispatch({type: "SET_CHARACTER_ANIMATING"});
  //       setTimeout(function() {
  //         this.props.dispatch({type: "SET_CHARACTER_IDLE"});
  //       }.bind(this), 1500);
  //     }
  //   }
  //   if(event.keyCode === KEY.RIGHT  || event.keyCode === KEY.D) {
  //     if (!this.props.animating) {
  //       this.props.dispatch({type: "SET_MAIN_DESCRIPTION", payload: ""});
  //       this.props.dispatch({type: "MOVE_CHARACTER_RIGHT"});
  //       this.props.dispatch({type: "SET_CHARACTER_ANIMATING"});
  //       setTimeout(function() {
  //         this.props.dispatch({type: "SET_CHARACTER_IDLE"});
  //       }.bind(this), 1500);
  //     }
  //   }
  //   // if(e.keyCode === KEY.UP     || e.keyCode === KEY.W) keys.up    = value;
  //   // if(e.keyCode === KEY.SPACE) keys.space = value;
  // }
  render() {
    return <div className="layout">
      <div ref="body" className="body">
        {this.props.children}
      </div>
    </div>;
  }
}
