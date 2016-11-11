import { normalize, arrayOf } from 'normalizr';
import Immutable from 'seamless-immutable';

const defaultState = Immutable({
  fetching: false,
  fetched: false,
  error: null,
  width: 0,
  height: 0,
  frame: 0,
  right: true,
});

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case "SET_LAYOUT_FRAME": {
      let right = true;
      if (action.payload < state.frame) {
        right = false;
      }
      return state.merge({frame: action.payload, right: right});
    }
    case "SET_LAYOUT_SIZE": {
      return state.merge({width: action.payload.width + 4, height: action.payload.height - 4});
    }
  }
  return state;
};
