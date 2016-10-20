import axios from "axios";

import serverConfig from "./../config/server";

export function fetchTexts() {
  let file = "texts.json";
  let host;
  if (location.pathname == "/") {
    host = location.origin
  } else {
    host = location.origin + location.pathname;
  }
  return {
    type: "FETCH_TEXTS",
    payload: axios.get(host + serverConfig.uData + file),
  }
}
