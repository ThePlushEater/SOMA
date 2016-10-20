import { normalize } from 'normalizr';

export default function reducer(state={
  fetching: false,
  fetched: false,
  error: null,
  actors: [],
}, action) {
  switch (action.type) {
    case "FETCH_ACTORS_PENDING": {
      return {...state, fetching: true}
    }
    case "FETCH_ACTORS_REJECTED" : {
      return {...state, fetching: false, error: action.payload}
    }
    case "FETCH_ACTORS_FULFILLED" : {
      return {...state, fetching: false, fetched: true, actors: action.payload.data}
    }
  }
  return state;
};
