import axios from "axios";

import serverConfig from "./../config/server";

export function fetchSprites() {
  let file = "sprites.json";
  let host;
  if (location.pathname == "/") {
    host = location.origin
  } else {
    host = location.origin + location.pathname;
  }
  return {
    type: "FETCH_SPRITES",
    payload: axios.get(host + serverConfig.uData + file),
  }
}
