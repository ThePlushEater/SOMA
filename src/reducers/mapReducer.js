export default function reducer(state={
  error: null,
  map: null,
  tile: null,
}, action) {
  switch (action.type) {
    case "SET_ACTIVE_MAP": {
      return {...state, map: action.payload}
    }
    case "SET_ACTIVE_TILE": {
      return {...state, tile: action.payload}
    }
  }
  return state;
};
