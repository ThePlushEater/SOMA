import React from "react";
import { connect } from "react-redux";

import store from "./../../store/store";
import Canvas from "./../canvas/canvas.component";

require('./layer-front.component.scss');

@connect((store) => {
  return {
    // front: store.layout.front,
    localization: store.localization.localization,
  }
})
export default class LayerFront extends React.Component {
  componentWillMount() {

  }
  selectFront(event) {
    event.stopPropagation();
    store.dispatch({type: "SELECT_FRONT", payload: {front: this.props.front}});
  }
  openFront(event) {
    event.stopPropagation();
    // store.dispatch({type: "OPEN_FRONT"});
  }
  render() {
    let theme;
    if (this.props.front && this.props.front.theme) {
      theme = " " + this.props.front.theme;
    } else {
      theme = "";
    }
    let index = -1;
    let title = this.props.front.title.split("").map((char) => {
      index++;
      return <div key={"title-" + index}>{char.toUpperCase()}</div>;
    });
    if (this.props.open) {
      return <div className={"layer-front active open" + theme} onClick={this.openFront.bind(this)}>
        <div className="left">
          <div className="title">
            {title}
          </div>
        </div>
        <div className="right">
        </div>
        <Canvas />
      </div>;
    } else if (this.props.active) {
      return <div className={"layer-front active" + theme} onClick={this.openFront.bind(this)}>
        <div className="left">
          <div className="title">
            {title}
          </div>
        </div>
        <div className="right">
        </div>
        <Canvas />
      </div>;
    } else {
      return <div className={"layer-front" + theme} onClick={this.selectFront.bind(this)}>
        <div className="left">
          <div className="title">
            {title}
          </div>
        </div>
        <div className="right">
        </div>
      </div>;
    }

  }
}
