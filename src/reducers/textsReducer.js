import { normalize } from 'normalizr';

export default function reducer(state={
  fetching: false,
  fetched: false,
  error: null,
  texts: [],
}, action) {
  switch (action.type) {
    case "FETCH_TEXTS_PENDING": {
      return {...state, fetching: true}
    }
    case "FETCH_TEXTS_REJECTED" : {
      return {...state, fetching: false, error: action.payload}
    }
    case "FETCH_TEXTS_FULFILLED" : {
      return {...state, fetching: false, fetched: true, texts: action.payload.data}
    }
  }
  return state;
};
