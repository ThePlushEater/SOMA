import { combineReducers } from "redux";

import localization from "./localizationReducer";
import character from "./characterReducer";
import backgrounds from "./backgroundsReducer";
import actors from "./actorsReducer";


export default combineReducers({
  localization,
  character,
  backgrounds,
  actors,
});
