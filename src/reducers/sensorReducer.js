import { normalize } from 'normalizr';
import { station, port, sensor } from "./../schema";

export default function reducer(state={
  fetching: false,
  fetched: false,
  error: null,
}, action) {
  switch (action.type) {
    case "FETCH_SENSORS_PENDING": {
      return {...state, fetching: true}
    }
    case "FETCH_SENSORS_REJECTED" : {
      return {...state, fetching: false, error: action.payload}
    }
    case "FETCH_SENSORS_FULFILLED" : {
      console.log(action.payload.data);
      console.log(normalize(action.payload.data, station));
      return {...state, fetching: false, fetched: true}
    }
  }
  return state;
};
