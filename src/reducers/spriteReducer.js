import { normalize, arrayOf } from 'normalizr';
import Immutable from 'seamless-immutable';

const defaultState = Immutable({
  fetching: false,
  fetched: false,
  error: null,
  sprites: [],
});

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case "FETCH_SPRITES_PENDING": {
      return state.merge({fetching: true});
    }
    case "FETCH_SPRITES_REJECTED" : {
      return state.merge({fetching: false, error: action.payload});
    }
    case "FETCH_SPRITES_FULFILLED" : {
      return state.merge({fetching: false, fetched: true, error: null, sprites: action.payload.data.sprites});
    }
  }
  return state;
};
