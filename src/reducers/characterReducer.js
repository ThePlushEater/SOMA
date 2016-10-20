import { normalize } from 'normalizr';

export default function reducer(state={
  fetching: false,
  fetched: false,
  error: null,
  character: null,
  animating: false,
}, action) {
  switch (action.type) {
    case "FETCH_CHARACTER_PENDING": {
      return {...state, fetching: true}
    }
    case "FETCH_CHARACTER_REJECTED" : {
      return {...state, fetching: false, error: action.payload}
    }
    case "FETCH_CHARACTER_FULFILLED" : {
      return {...state, fetching: false, fetched: true, character: action.payload.data}
    }
    case "MOVE_CHARACTER_LEFT" : {
      const character = {...state.character, position: Math.max(state.character.position - 1, 0), facing: "LEFT"};
      return {...state, character: character}
    }
    case "MOVE_CHARACTER_RIGHT" : {
      const character = {...state.character, position: Math.min(state.character.position + 1, state.character.maxPosition), facing: "RIGHT"};
      return {...state, character: character}
    }
    case "SET_CHARACTER_IDLE" : {
      return {...state, animating: false}
    }
    case "SET_CHARACTER_ANIMATING" : {
      return {...state, animating: true}
    }
  }
  return state;
};
