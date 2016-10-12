import React from "react";
import { connect } from "react-redux";

import LayerFront from "./layer-front.component";
import store from "./../../store/store";
import Home from "./../home/home.component";

require('./layer-root.component.scss');

@connect((store) => {
  return {
    front: store.layout.front,
    layout: store.layout.layout,
    localization: store.localization.localization,
  }
})
export default class LayerRoot extends React.Component {
  componentWillMount() {

  }
  render() {
    let fronts;
    if (this.props.layout.front) {
      fronts = this.props.layout.front.map((front) => {
        let active = false;
        let open = false;
        if (this.props.front && this.props.front.id === front.id) {
          active = true;
          if (this.props.front.open) {
            open = true;
          }
        }
        if (active) {
          return <LayerFront key={front.id} front={this.props.front} open={open} active={active} />;
        } else {
          return <LayerFront key={front.id} front={front} open={open} active={active} />;
        }
      });
    }
    return <div className="layer-root">
      <Home />
      {fronts}
    </div>;
  }
}
