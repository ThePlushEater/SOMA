import * as L from 'leaflet';

require('./station.component.scss');

export default class Station extends L.layerGroup {
  constructor(props) {
    super();
  }
  render(map) {
    this.addTo(map);
  }
}
