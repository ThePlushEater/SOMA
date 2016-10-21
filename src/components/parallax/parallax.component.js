import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";

import ParallaxLayer from "./parallax-layer.component";

import TextTitle from "./../texts/text-title.component";
import TextPlain from "./../texts/text-plain.component";

import Trike from "./../actors/trike/trike.component";

require('./parallax.component.scss');


@connect((store) => {
  return {
    pageWidth: store.layout.width,
    pageHeight: store.layout.height,
    localization: store.localization.localization,
  }
})
export default class Parallax extends React.Component {
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
  render() {
    return (
      <div ref="parallax" className="parallax">
        <ParallaxLayer page={0} speed={3.5} blur={0} position={{x: 0.5, y: 0.6}} origin={4} valign={"BOTTOM"} child={<TextTitle size={{x: 0.5, y: 0.5}} />} />
        <ParallaxLayer page={0} speed={20.5} blur={0} position={{x: 1.3, y: 0.6}} origin={0} valign={"TOP"} child={<TextPlain size={{x: null, y: 0.035}} text={"This site explores new ways of thinking"} />} />
        <ParallaxLayer page={0} speed={30.5} blur={0} position={{x: 2, y: 0.65}} origin={0} valign={"TOP"} child={<TextPlain size={{x: null, y: 0.035}} text={"about how children play digital games"} />} />
        <ParallaxLayer page={0} speed={-5.5} blur={0} position={{x: -0.1, y: 0.1}} origin={0} valign={"BOTTOM"} child={<Trike size={{x: null, y: 0.1}} />} />
      </div>
    )
  }
}
