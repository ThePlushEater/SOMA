export default function reducer(state={
  fetching: false,
  fetched: false,
  error: null,
  layout: {},
  front: null,
  focus: true,
}, action) {
  switch (action.type) {
    case "FETCH_LAYOUT_PENDING": {
      return {...state, fetching: true};
    }
    case "FETCH_LAYOUT_REJECTED" : {
      return {...state, fetching: false, error: action.payload};
    }
    case "FETCH_LAYOUT_FULFILLED" : {
      // let front = state.front;
      // if (action.payload.layout && front == null) {
      //   front = action.payload.layout.front[0];
      // }
      return {...state, fetching: false, fetched: true, layout: action.payload.layout};
    }
    case "SELECT_FRONT": {
      if (action.payload.front) {
        let front = {...action.payload.front, open: false};
        return {...state, front: front};
      }
      return {...state, front: null};
    }
    case "OPEN_FRONT": {
      let front = {...state.front, open: true};
      return {...state, front: front};
    }
    case "WINDOW_FOCUS": {
      return {...state, focus: true};
    }
    case "WINDOW_BLUR": {
      return {...state, focus: false};
    }
  }
  return state;
};
