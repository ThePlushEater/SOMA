import { normalize } from 'normalizr';

export default function reducer(state={
  fetching: false,
  fetched: false,
  error: null,
  width: 0,
  height: 0,
  scrollTop: 0,
  scrollLeft: 0,
}, action) {
  switch (action.type) {
    case "SET_LAYOUT_SCROLL_LEFT": {
      return {...state, scrollLeft: action.payload}
    }
    case "SET_LAYOUT_SIZE": {
      return {...state, width: action.payload.width, height: action.payload.height}
    }
  }
  return state;
};
