import React from "react";
import { connect } from "react-redux";

import serverConfig from "./../../config/server";
import HomeCanvas from "./home-canvas.component";

require('./home.component.scss');

@connect((store) => {
  return {
    localization: store.localization.localization,
  }
})
export default class Home extends React.Component {
  componentWillMount() {

  }
  render() {
    return <div className="home">
      <div className="wrapper">
        <HomeCanvas />
        <div className="title">
          <span className="letter green">S</span>
          <img className="image" src="./kids.png" />
          <span className="letter yellow">M</span>
          <span className="letter red">A</span>
        </div>
      </div>
    </div>;
  }
}
