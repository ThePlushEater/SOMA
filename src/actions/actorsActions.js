import axios from "axios";

import serverConfig from "./../config/server";

export function fetchActors() {
  let file = "actors.json";
  let host;
  if (location.pathname == "/") {
    host = location.origin
  } else {
    host = location.origin + location.pathname;
  }
  return {
    type: "FETCH_ACTORS",
    payload: axios.get(host + serverConfig.uData + file),
  }
}
