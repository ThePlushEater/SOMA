import axios from "axios";

import serverConfig from "./../config/server";

export function fetchLayout() {
  return function(dispatch) {
    dispatch({type: "FETCH_LAYOUT_PENDING"});
    let host;
    if (location.pathname == "/") {
      host = location.origin
    } else {
      host = location.origin + location.pathname;
    }
    axios.get(host + serverConfig.uData + "layout.json")
      .then((response) => {
        dispatch({type: "FETCH_LAYOUT_FULFILLED", payload: {layout: response.data}});
      })
      .catch((error) => {
        dispatch({type: "FETCH_LAYOUT_REJECTED", payload: error});
      })
  }
}
