import { Schema, arrayOf } from 'normalizr';

const page = new Schema('pages');
const element = new Schema('elements');
// const sensor = new Schema('sensors');

page.define({
  elements: arrayOf(element),
});


// A Port has one sensor attached
// port.define({
//   sensor: sensor
// });

// sensor.define({
//   data: arrayOf(datum)
// });

export { page, element };
