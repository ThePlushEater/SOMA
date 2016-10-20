import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";

import GObject from "./../../gobjects/gobject";
import Road from "./../../gobjects/road";
import Block from "./../../gobjects/block";
import Start from "./../../gobjects/start";
import End from "./../../gobjects/end";
import Route from "./../../gobjects/route";
import { gatherRenderableGObjects, findGObjectsByMouse, getNeightborRoads, resetRoadSteps } from "./../../utils/helper";
import { fetchPathfinderSetup } from "./../../actions/pathfinderActions";

require('./pathfinder.component.scss');


@connect((store) => {
  return {
    dimension: store.pathfinder.dimension,
    start: store.pathfinder.start,
    end: store.pathfinder.end,
    step: store.pathfinder.step,
    localization: store.localization.localization,
  }
})
export default class Pathfinder extends React.Component {
  constructor() {
    super();
    this.timer = null;
    this.context = null;
    this.root = null;
    this.selected = null;
    this.state = {
      screen: {
        width: 1024,
        height: 640
      },
      animating: false
    }
    this.mouseDown = false;
  }
  componentWillMount() {
    this.props.dispatch(fetchPathfinderSetup());
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this, false));
    const canvas = ReactDom.findDOMNode(this.refs['canvas']);
    // Register mouse click event listener
    canvas.addEventListener("mousedown", this.handleMouseDown.bind(this, false));
    canvas.addEventListener("mousemove", this.handleMouseMove.bind(this, false));
    canvas.addEventListener("mouseup", this.handleMouseUp.bind(this, false));
    this.context = canvas ? canvas.getContext('2d') : null;
    this.update();
  }
  componentWillReceiveProps(nextProps) {

  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.dimension && nextProps.dimension) {
      if (this.props.dimension.x != nextProps.dimension.x || this.props.dimension.y != nextProps.dimension.y) {
        this.setup(nextProps, nextState);
        return true;
      }
    }
    if (this.props.step != nextProps.step) {
      return true;
    }
    if (this.state.animating != nextState.animating) {
      return true;
    }
    return false;
  }
  componentWillUnmount() {

  }
  setup(props, state) {
    this.root = new GObject({
      position: {
        x: state.screen.width / 2,
        y: state.screen.height / 2
      }
    });

    let width = state.screen.width / props.dimension.x;
    let height = state.screen.height / props.dimension.y;
    for (let i=0; i<props.dimension.x; i++) {
      for (let j=0; j<props.dimension.y; j++) {
        this.root.children.push(new Road({
          position: {
            x: i * width + width / 2,
            y: j * height + width / 2,
          },
          coords: {
            x: i,
            y: j,
          },
          width: width,
          height: height,
        }));
      }
    }

    this.root.children.push(new Start({
      position: {
        x: props.start.x * width + width / 2,
        y: props.start.y * height + width / 2,
      },
      coords: {
        x: props.start.x,
        y: props.start.y,
      },
      width: width,
      height: height,
    }));

    this.root.children.push(new End({
      position: {
        x: props.end.x * width + width / 2,
        y: props.end.y * height + width / 2,
      },
      coords: {
        x: props.end.x,
        y: props.end.y,
      },
      width: width,
      height: height,
    }));

    this.root.children.push(new Route({
      position: {x: 0, y: 0},
      width: width,
      height: height,
    }));
  }
  handleResize(value, event){

  }
  handleMouseDown(value, event) {
    this.mouseDown = true;
    const objects = findGObjectsByMouse(this.context, this.root, {x: event.offsetX, y: event.offsetY});
    if (objects) {
      // For performance reasons, we will first map to a temp array, sort and map the temp array to the objects array.
      let map = objects.map(function (object, index) {
        return { index : index, value : object.zIndex };
      });
      // Now we need to sort the array by z index.
      map.sort(function (a, b) {
        return b.value - a.value;
      });
      // We finaly rebuilt our sorted objects array.
      const sorted = map.map(function (object) {
        return objects[object.index];
      });

      const object = sorted[0];
      // if (object) {
      //   console.log(object.toString());
      // }

      if (object) {
        let temp;
        if (object instanceof Road) {
          temp = new Block({
            position: object.position,
            coords: object.coords,
            width: object.width,
            height: object.height,
          });
          object.destroy();
          this.root.children.push(temp);
        } else if (object instanceof Block) {
          temp = new Road({
            position: object.position,
            coords: object.coords,
            width: object.width,
            height: object.height,
          });
          object.destroy();
          this.root.children.push(temp);
        } else if (object instanceof Start || object instanceof End) {
          temp = object;
        }
        this.selected = temp;
        this.run();
        return;
      }
    }
  }
  handleMouseMove(value, event) {
    if (!this.mouseDown) {
      return;
    }

    if (this.selected instanceof Road) {  // Change mouse moved objects to Road
      let objects = findGObjectsByMouse(this.context, this.root, {x: event.offsetX, y: event.offsetY});
      objects.forEach((object) => {
        if (object instanceof Block && this.selected.toString() != object.toString()) {
          let temp = new Road({
            position: object.position,
            coords: object.coords,
            width: object.width,
            height: object.height,
          });
          object.destroy();
          this.root.children.push(temp);
          this.selected = temp;
        }
      });
      this.run();
    } else if (this.selected instanceof Block) {  // Change mouse moved objects to Block
      let objects = findGObjectsByMouse(this.context, this.root, {x: event.offsetX, y: event.offsetY});
      objects.forEach((object) => {
        if (object instanceof Road && this.selected.toString() != object.toString()) {
          let temp = new Block({
            position: object.position,
            coords: object.coords,
            width: object.width,
            height: object.height,
          });
          object.destroy();
          this.root.children.push(temp);
          this.selected = temp;
        }
      });
      this.run();
    } else if (this.selected instanceof Start || this.selected instanceof End) {
      let width = this.state.screen.width / this.props.dimension.x;
      let height = this.state.screen.height / this.props.dimension.y;
      var x = Math.round((event.offsetX - width / 2) / width);
      var y = Math.round((event.offsetY - height / 2) / height);
      this.selected.position = {
        x: x * width + width / 2,
        y: y * height + width / 2,
      };
      this.selected.coords = {x: x, y: y};
      if (this.selected instanceof Start) {
        this.props.dispatch({type: "SET_PATHFINDER_START", payload: {x: x, y: y}});
      } else if (this.selected instanceof End) {
        this.props.dispatch({type: "SET_PATHFINDER_END", payload: {x: x, y: y}});
      }
      this.run();
    }
  }
  handleMouseUp(value, event) {
    this.mouseDown = false;
    this.selected = null;
  }
  update() {
    if (this.root) {
      this.root.update();
    }
    const objects = gatherRenderableGObjects(this.root);
    // For performance reasons, we will first map to a temp array, sort and map the temp array to the objects array.
    const map = objects.map(function (object, index) {
      return { index : index, value : object.zIndex };
    });
    // Now we need to sort the array by z index.
    map.sort(function (a, b) {
      return a.value - b.value;
    });
    // We finaly rebuilt our sorted objects array.
    const sorted = map.map(function (object) {
      return objects[object.index];
    });
    // Now that objects are sorted, we can iterate to draw them.
    for (let i = 0; i < sorted.length; i++) {
      sorted[i].render(this.context);
    }

    // Execute next frame.
    requestAnimationFrame(() => {this.update()});
  }
  onStepPrev() {
    this.props.dispatch({type: "DECREASE_PATHFINDER_STEP"});
  }
  onStepNext() {
    this.props.dispatch({type: "INCREASE_PATHFINDER_STEP"});
  }
  run() {
    if (!this.root) {
      return;
    }
    resetRoadSteps(this.root);

    const start = this.root.children.filter((object) => {
      if (object instanceof Start) {
        return true;
      }
    })[0];
    const end = this.root.children.filter((object) => {
      if (object instanceof End) {
        return true;
      }
    })[0];

    const route = this.root.children.filter((object) => {
      if (object instanceof Route) {
        return true;
      }
    })[0];

    // Run pathfinding.
    let frontier = [];
    frontier.push(start);
    let visited = [];
    visited.push(start);
    let cameFrom = [];
    cameFrom[start] = null;
    while (frontier.length > 0) {
      const current = frontier.shift();
      if (current.coords.x == end.coords.x && current.coords.y == end.coords.y) {
        break;
      }
      if (this.props.step > current.step) {
        const neighbors = getNeightborRoads(current, this.root.children);
        neighbors.forEach((next) => {
          let found = false;
          for (let i=0; i<visited.length && !found; i++) {
            if (next.coords.x == visited[i].coords.x && next.coords.y == visited[i].coords.y) {
              found = true;
            }
          }
          if (!found) {
            frontier.push(next);
            visited.push(next);
            cameFrom[next] = current;
            next.step = current.step + 1;
          }
        });
      }
    }

    // Reconstruct path.
    let current = end;
    let path = [];
    path.push(end);
    while (current != null && current.toString() != start.toString()) {
      current = cameFrom[current];
      if (current) {
        path.push(current);
      }
    }
    path = path.reverse();
    route.path = path;
  }
  onStartAnimation() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(function() {
      this.props.dispatch({type: "INCREASE_PATHFINDER_STEP"});
    }.bind(this), 500);
    this.setState({
      animating: true
    });
  }
  onStopAnimation() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = 0;
    }
    this.setState({
      animating: false
    });
  }
  onStepReset() {
    this.props.dispatch({type: "RESET_PATHFINDER_STEP"});
  }
  render() {
    this.run();
    let animationButton;
    if (this.state.animating) {
      animationButton = <button onClick={this.onStopAnimation.bind(this)}>{this.props.localization.sButtonStopAnimation}</button>;
    } else {
      animationButton = <button onClick={this.onStartAnimation.bind(this)}>{this.props.localization.sButtonStartAnimation}</button>;
    }


    return <div ref="wrapper" className="pathfinder">
      <div>
        <div className="info">{this.props.localization.sStepText + " (" + this.props.step + ")"}</div>
        <canvas ref="canvas" width={this.state.screen.width} height={this.state.screen.height} />
        <div>
          <button onClick={this.onStepReset.bind(this)}>{this.props.localization.sButtonReset}</button>
          <button onClick={this.onStepPrev.bind(this)}>{this.props.localization.sButtonPrev}</button>
          <button onClick={this.onStepNext.bind(this)}>{this.props.localization.sButtonNext}</button>
          {animationButton}
        </div>
      </div>
    </div>;
  }
}
