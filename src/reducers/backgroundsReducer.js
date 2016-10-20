import { normalize } from 'normalizr';

export default function reducer(state={
  fetching: false,
  fetched: false,
  error: null,
  backgrounds: [],
}, action) {
  switch (action.type) {
    case "FETCH_BACKGROUNDS_PENDING": {
      return {...state, fetching: true}
    }
    case "FETCH_BACKGROUNDS_REJECTED" : {
      return {...state, fetching: false, error: action.payload}
    }
    case "FETCH_BACKGROUNDS_FULFILLED" : {
      return {...state, fetching: false, fetched: true, backgrounds: action.payload.data}
    }
  }
  return state;
};
