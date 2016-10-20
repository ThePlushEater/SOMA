import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";

import { fetchCharacter } from "./../../actions/characterActions";
import { fetchBackgrounds } from "./../../actions/backgroundsActions";
import Character from "./../character/character.component";
import Ground from "./../ground/ground.component";
import Cloud from "./../cloud/cloud.component";
import Building from "./../building/building.component";
import Mountain from "./../mountain/mountain.component";
import Panel from "./../panel/panel.component";
import Pillar from "./../pillar/pillar.component";
import Roof from "./../roof/roof.component";
import Bookshelf from "./../bookshelf/bookshelf.component";


require('./dashboard.component.scss');


@connect((store) => {
  return {
    character: store.character.character,
    backgrounds: store.backgrounds.backgrounds,
    localization: store.localization.localization,
  }
})
export default class Dashboard extends React.Component {
  constructor() {
    super();
  }
  componentWillMount() {
    this.props.dispatch(fetchCharacter());
    this.props.dispatch(fetchBackgrounds());
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
    let character, backgrounds;
    if (this.props.character) {
      character = <Character character={this.props.character} />;
    }
    backgrounds = this.props.backgrounds.map((item, index) => {
      if (item.type == "GROUND") {
        return <Ground key={"background-" + index} ground={item} />;
      } else if (item.type == "CLOUD") {
        return <Cloud key={"background-" + index} cloud={item} />;
      } else if (item.type == "BUILDING") {
        return <Building key={"background-" + index} building={item} />;
      } else if (item.type == "MOUNTAIN") {
        return <Mountain key={"background-" + index} mountain={item} />;
      } else if (item.type == "PANEL") {
        return <Panel key={"background-" + index} panel={item} />;
      } else if (item.type == "PILLAR") {
        return <Pillar key={"background-" + index} pillar={item} />;
      } else if (item.type == "ROOF") {
        return <Roof key={"background-" + index} roof={item} />;
      } else if (item.type == "BOOKSHELF") {
        return <Bookshelf key={"background-" + index} bookshelf={item} />;
      }
    });
    return (
      <div className="dashboard">
        {backgrounds}
        {character}
      </div>
    )
  }
}
