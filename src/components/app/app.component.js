import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";

import { fetchLocalization } from "./../../actions/localizationActions";
import { fetchSprites } from "./../../actions/spriteActions";
import Sprite from "./../sprite/sprite.component";

require('./app.component.scss');

@connect((store) => {
  return {
    layout: store.layout,
    sprite: store.sprite,
    localization: store.localization.localization,
  }
})
export default class App extends React.Component {
  constructor() {
    super();
  }
  componentWillMount() {
    this.props.dispatch(fetchLocalization());
    this.props.dispatch(fetchSprites());
  }
  componentDidMount() {
    const app = ReactDom.findDOMNode(this.refs['app']);
    this.props.dispatch({type: "SET_LAYOUT_SIZE", payload: {width: app.clientWidth, height: app.clientHeight}});
    app.addEventListener('mousewheel', this.handleMouseWheel.bind(this, app));
    app.addEventListener('scroll', this.handleScroll.bind(this, app));
    window.addEventListener('resize', this.handleResize.bind(this, app));
  }
  handleMouseWheel(element, event) {
    element.scrollLeft += event.deltaY * 0.01;
  }
  handleScroll(element, event) {
    this.props.dispatch({type: "SET_LAYOUT_FRAME", payload: element.scrollLeft});
  }
  handleResize(element, event) {
    this.props.dispatch({type: "SET_LAYOUT_SIZE", payload: {width: element.clientWidth, height: element.clientHeight}});
    this.props.dispatch({type: "SET_LAYOUT_FRAME", payload: element.scrollLeft});
  }
  render() {
    const sprite = this.props.sprite.sprites.map((item, index) => {
      return <Sprite key={"sprite-" + index} item={item} />;
    });
    return(
      <div ref="app" className="app">
        <div className="body">
          <div className="frame">{this.props.layout.frame}</div>
          {sprite}
        </div>
      </div>
    );
  }
}
