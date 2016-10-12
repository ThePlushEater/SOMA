import React from "react";

require('./road.component.scss');

export default class Road extends React.Component {

  render() {
    let coords = this.props.coords;
    if (this.props.width !== 0 && this.props.height !== 0) {
      return (
        <line className="road" {...coords} stroke="#ffffff" strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" strokeMiterlimit="10" strokeDasharray={this.props.width} strokeDashoffset={this.props.width} />
      )
    }
    return null;
  }
}
