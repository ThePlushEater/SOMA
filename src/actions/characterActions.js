import axios from "axios";

import serverConfig from "./../config/server";

export function fetchCharacter() {
  let file = "character.json";
  let host;
  if (location.pathname == "/") {
    host = location.origin
  } else {
    host = location.origin + location.pathname;
  }
  return {
    type: "FETCH_CHARACTER",
    payload: axios.get(host + serverConfig.uData + file),
  }
}
