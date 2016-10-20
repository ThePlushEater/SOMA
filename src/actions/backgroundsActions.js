import axios from "axios";

import serverConfig from "./../config/server";

export function fetchBackgrounds() {
  let file = "backgrounds.json";
  let host;
  if (location.pathname == "/") {
    host = location.origin
  } else {
    host = location.origin + location.pathname;
  }
  return {
    type: "FETCH_BACKGROUNDS",
    payload: axios.get(host + serverConfig.uData + file),
  }
}
