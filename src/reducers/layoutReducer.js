import { normalize } from 'normalizr';

export default function reducer(state={
  fetching: false,
  fetched: false,
  error: null,
  width: 0,
  height: 0,
  frame: 0,
}, action) {
  switch (action.type) {
    case "SET_LAYOUT_FRAME": {
      return {...state, frame: action.payload}
    }
    case "SET_LAYOUT_SIZE": {
      return {...state, width: action.payload.width + 4, height: action.payload.height - 4}
    }
  }
  return state;
};
